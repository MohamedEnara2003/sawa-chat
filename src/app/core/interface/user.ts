export interface UploadFileData {
    file_name: string , file_url: string
}
export interface userDetails {
gender : string ,
work : string ,
address : string ,
}

export interface userType {
id? : number ,
user_id : string ,
created_at? : string ,
fullName : string ,
email : string ,
phone_number? : string ,
avatar_url? : string ,
avatar_name? : string ,
bio? : string ,
role : 'user' | 'admin' ,
details? :  userDetails ,
skills? : string[] ,
}

export interface UserEditableData {
avatar_url? : string ,
avatar_name? : string ,
bio? : string ,
details? :  userDetails,
skills? : string[] ,
}