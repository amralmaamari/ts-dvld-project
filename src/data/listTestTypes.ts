export interface IListTestTypeRow {
    TestTypeID: number;
    TestTypeTitle: string;
    TestTypeDescription: string;
    TestTypeFees: number;
}

export interface IListTestTypesResponses {
    success:boolean,
    testTypes:IListTestTypeRow[],
}
export const ListTestTypesData:IListTestTypesResponses = {
  "success": true,
  "testTypes": [
    {
      "TestTypeID": 1,
      "TestTypeTitle": "Vision Test",
      "TestTypeDescription": "This assesses the applicant's visual acuity to ensure they have sufficient vision to drive safely.",
      "TestTypeFees": 10.0
    },
    {
      "TestTypeID": 2,
      "TestTypeTitle": "TestTypeID",
      "TestTypeDescription": "This test assesses the applicant's knowledge of traffic rules, road signs, and driving regulations. It typically consists of multiple-choice questions, and the applicant must select the correct answer(s). The written test aims to ensure that the applicant understands the rules of the road and can apply them in various driving scenarios.",
      "TestTypeFees": 20.0
    },
    {
      "TestTypeID": 3,
      "TestTypeTitle": "Practical (Street) Test",
      "TestTypeDescription": "This test evaluates the applicant's driving skills and ability to operate a motor vehicle safely on public roads. A licensed examiner accompanies the applicant in the vehicle and observes their driving performance.",
      "TestTypeFees": 35.0
    }
  ]
};