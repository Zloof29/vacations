import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-error";
import { fileSaver } from "uploaded-file-saver";
import { VacationModel } from "../3-models/vacation-model";
import { LikeModel } from "../3-models/like-model";

// Product service - any logic regarding products:
class VacationService {
  public async getVacationsById(id: number): Promise<VacationModel> {
    const sql = `
      SELECT
        V.*, 
        CONCAT('http://localhost:4000/api/vacations/images/', imageName) AS imageUrl, 
        0 AS isLiked, 
        (SELECT COUNT(*) FROM likes WHERE vacationId = V.id) AS likesCount 
      FROM vacations as V 
      WHERE V.id = ${id}
      ORDER BY V.startDate
      LIMIT 1
    `;

    const vacations = await dal.execute(sql);

    return vacations[0];
  }

  public async getAllVacations(): Promise<VacationModel[]> {
    const sql = `
      SELECT 
        V.*, 
        CONCAT('http://localhost:4000/api/vacations/images/', imageName) AS imageUrl, 
        0 AS isLiked, 
        (SELECT COUNT(*) FROM likes WHERE vacationId = V.id) AS likesCount 
      FROM vacations as V 
      ORDER BY V.startDate
    `;

    const vacations = await dal.execute(sql);

    return vacations;
  }

  public async getAllVacationsByUserId(
    userId: number
  ): Promise<VacationModel[]> {
    const sql =
      "SELECT V.*, CONCAT('http://localhost:4000/api/vacations/images/', imageName) AS imageUrl, EXISTS(SELECT * FROM likes WHERE vacationId = L.vacationId AND userId = ?) AS isLiked, COUNT(L.userId) AS likesCount FROM vacations as V LEFT JOIN likes as L ON V.id = L.vacationId GROUP BY V.id ORDER BY V.startDate";
    const vacations = await dal.execute(sql, [userId]);

    return vacations;
  }

  // Add product:
  public async addVacation(vacation: VacationModel) {
    // Validate:
    vacation.validateVacations();

    // Save image to disk:
    const imageName = vacation.imageName
      ? await fileSaver.add(vacation.imageName)
      : null;

    // SQL:
    const sql =
      "INSERT INTO vacations (id, vacationDestination, description, startDate, endDate, price, imageName) VALUES (default ,?, ?, ?, ?, ?, ?)";

    const values = [
      vacation.vacationDestination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      imageName,
    ];

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, values);

    // Get back the db product:
    vacation.id = info.insertId;

    // Return:
    return vacation;
  }

  // Update product:
  public async updateVacation(vacation: VacationModel) {
    // Validate:
    vacation.validateUpdateVacation();

    // SQL:
    const sql =
      "UPDATE vacations SET vacationDestination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? WHERE id = ?";

    const values = [
      vacation.vacationDestination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      vacation.imageName,
      vacation.id,
    ];

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, values);

    // If product not found:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);

    // Return:
    return vacation;
  }

  // Delete product:
  public async deleteVacation(id: number) {
    //SQL:
    const deleteLikes = "delete from likes where vacationId = ?";
    //Execute:
    await dal.execute(deleteLikes, [id]);

    // SQL:
    const sql = "delete from vacations where id = ?";

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [id]);

    // If product not found:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }

  public async deleteLikeVacation(userId: number, vacationId: number) {
    const sql = "DELETE FROM likes WHERE userId = ? AND vacationId = ?";

    const values = [userId, vacationId];

    const info: OkPacketParams = await dal.execute(sql, values);

    if (info.affectedRows === 0)
      throw new ResourceNotFoundError(userId || vacationId);
  }

  public async displayActiveVacations() {
    const sql =
      "SELECT * FROM vacations WHERE CURDATE() BETWEEN startDate AND endDate";

    const activeVacations = await dal.execute(sql);

    return activeVacations;
  }

  public async displayInactiveVacations(): Promise<VacationModel[]> {
    const sql =
      "SELECT * FROM vacations WHERE CURDATE() NOT BETWEEN startDate AND endDate";

    const inactiveVacations = await dal.execute(sql);

    return inactiveVacations;
  }

  public async displayLikedVacations(userId: number): Promise<VacationModel[]> {
    const sql =
      "SELECT v.*, CONCAT('http://localhost:4000/api/vacations/images/', imageName) AS imageUrl, 0 AS isLiked, (SELECT COUNT(*) FROM likes WHERE vacationId = V.id) AS likesCount FROM likes l JOIN vacations v ON l.vacationId = v.id WHERE l.userId = ? ORDER BY v.startDate";

    const likedVacations = await dal.execute(sql, [userId]);

    return likedVacations;
  }

  public async likeVacation(like: LikeModel) {
    const sql =
      "INSERT INTO likes(id, userId, vacationId) VALUES (default, ?, ?)";

    const info: OkPacketParams = await dal.execute(sql, [
      like.userId,
      like.vacationId,
    ]);

    like.id = info.insertId;

    console.log(like);

    return like;
  }
}

export const vacationService = new VacationService();
