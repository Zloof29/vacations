class AppConfig {
  public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
  public readonly vacationUrl = "http://localhost:4000/api/vacation/";
  public readonly vacationsByUserIdUrl =
    "http://localhost:4000/api/vacations/user/";
  public readonly likedVacationsUrl =
    "http://localhost:4000/api/likedVacations/";
  public readonly addVacationsUrl = "http://localhost:4000/api/vacations/";
  public readonly deleteVacationUrl = "http://localhost:4000/api/vacations/";
  public readonly addLikeUrl = "http://localhost:4000/api/vacationLike/";
  public readonly deleteLike = "http://localhost:4000/api/vacationsLike/";
  public readonly registerUrl = "http://localhost:4000/api/register/";
  public readonly loginUrl = "http://localhost:4000/api/login/";
}

export const appConfig = new AppConfig();
