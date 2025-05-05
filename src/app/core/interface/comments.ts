

export interface CommentsType {
id? : number ,
created_at? : string ,
post_id : number ,
user_id : string ,
value : string, 
}

export interface UserCommentstData extends CommentsType{
    user : {avatar_url : string , fullName : string}
}
