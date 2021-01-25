export interface i18nData {
	Key: string,
	Value: string
}
export interface Answer {
  id: string
  scale: number | null
}
export interface Questionnaire {
  id: string
  title: string
}
export interface LoginInfo {
  Email: string,
  Password: string,
  CompanyCode?: string
}
export interface SideMenuItem {
  label: string,
  iconUrl?: string,
  url: string,
  id: number,
  subtabs?: Array<SideMenuItem>
}
export namespace TablePage {
  export interface PageData {
    currentPage: number,
    rows: number
  }
  export interface SearchForm {
    keyword: string
  }
  export interface AddNewPersonnelForm {
    Name: string,
    Email: string,
    Phone: string,
    Photo: string,
    Identity: string,
    Position: string,
    Department: string,
    Graduation: string,
    Class: string,
    Profession: string,
    EmployNumber: string
  }
  export interface SurveyForm {
    [index: string]: boolean,
    CAT: boolean,
    MAYO: boolean,
    DDI: boolean
  }
  export interface TableSelectedItem {
    SubjectId: string,
    Name: string,
    Position: string
  }
  export interface TableItem {
    SubjectId: string | number,
    Department: string,
    Name: string,
    Email: string,
    Position: string,
    Class: string,
    CAT: number,
    CATId: number
  }
}
export interface TabItem {
  label: string,
  url: string,
  type: string,
  subtabs: Array<SideMenuItem>,
  id: number
}
