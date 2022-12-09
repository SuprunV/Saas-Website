export interface ICompany {
    id: number;
    img?: any;
    companyName: string;
    companyAlias: string;
    address: string;
    files?:any;
}

export interface IRegCompanyForm {
    companyName: string;
    companyAlias: string;
    username: string;
    password: string;
}
