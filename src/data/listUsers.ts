export interface IUsers {
    UserID: number;
    PersonID: number;
    FullName: string;
    UserName: string ;
    IsActive: number;
  }
  
  export interface IUsersResponses {
      success:boolean,
      users:IUsers[],
  }

  export const ListUsersData:IUsersResponses = {
    "success": true,
    "users":[
        {
          "UserID": 1,
          "PersonID": 1,
          "FullName": "Mohammed Saqer Mussa Abu-Hadhoud",
          "UserName": "Msaqer77",
          "IsActive": 1
        },
        {
          "UserID": 15,
          "PersonID": 2,
          "FullName": "Khalid ALi Maher hamed",
          "UserName": "User4",
          "IsActive": 0
        },
        {
          "UserID": 17,
          "PersonID": 1023,
          "FullName": "Omar Mohammed Saqer Abu-Hadhoud",
          "UserName": "Omar1",
          "IsActive": 1
        },
        {
          "UserID": 28,
          "PersonID": 3,
          "FullName": "u uu uu uu",
          "UserName": "U",
          "IsActive": 1
        },
        {
          "UserID": 36,
          "PersonID": 4,
          "FullName": "Amlie ♥ ♥ ♥",
          "UserName": "A",
          "IsActive": 0
        },
        {
          "UserID": 37,
          "PersonID": 5,
          "FullName": "s s s s",
          "UserName": "1",
          "IsActive": 1
        },
        {
          "UserID": 38,
          "PersonID": 6,
          "FullName": "Khaled Naswer Ali g",
          "UserName": "aa",
          "IsActive": 1
        },
        {
          "UserID": 39,
          "PersonID": 7,
          "FullName": "a a a a",
          "UserName": "amr",
          "IsActive": 1
        }
      ]
    };      