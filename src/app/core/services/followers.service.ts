import { inject, Injectable } from "@angular/core";
import { SingleTonApiService } from "./single-ton-api.service";
import { from, map, Observable } from "rxjs";
import { followerType, UserFollowerssData } from "../interface/followers";


@Injectable({
    providedIn: 'root'
})
export class FollowersService {
    
    private readonly tableName : string = "followers" ;
    private readonly singleTonApi = inject(SingleTonApiService) ;

    addFollow(data : followerType) : Observable<followerType> {
    return this.singleTonApi.insert(this.tableName , data);
    };

    unfollow(follower_id: string, following_id: string) {
    return this.singleTonApi.delete(this.tableName, { follower_id , following_id });
    };
    
    isFollowing(follower_id: string, following_id: string) : Observable<boolean> {
    const promise = this.singleTonApi.supabase.from(this.tableName)
    .select('id')
    .match({ follower_id, following_id })
    return from(promise).pipe(
        map((res) => {
            if (res.data && res.data.length > 0) {
            return true;
            } else {
            return false; 
            }
        }
    ));
    }

    getFollowersOrFollowingUsers(match: {}) : Observable<UserFollowerssData[]> {
    const promise = this.singleTonApi.supabase.from(this.tableName)
    .select(`
    id,
    created_at,
    follower_id,
    following_id,
    follower:follower_id(fullName, avatar_url),
    following:following_id(fullName, avatar_url)
    `)
    .match(match)
    return from(promise).pipe(map((res) => res.data!.map((item) => ({
        ...item,
        follower: Array.isArray(item.follower) ? item.follower[0] : item.follower ,
        following: Array.isArray(item.following) ? item.following[0] : item.following ,
    }))))
    };

    getFollowingIds(currentUserId : string) : Observable<string[]> {
    const promise = this.singleTonApi.supabase.from(this.tableName)
    .select(`following_id`)
    .eq('follower_id', currentUserId)
    return from(promise).pipe(map((res) => res.data?.map((row) => row.following_id) || []))
    }

    listenRealTime() : Observable<any> {
    return this.singleTonApi.RealTime(this.tableName)
    }
}
