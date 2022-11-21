export interface ICompany {
    id: number;
    img: string;
    companyName: string;
    companyAlias: string;
    address: string;
}

export interface IRegCompanyForm {
    companyName: string;
    companyAlias: string;
    username: string;
    password: string;
}
