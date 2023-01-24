export interface User {
	_id: string;
	avatar: string;
	username: string;
	bio: string;
	lastname: string;
	firstname: string;
	posts: Array<string>;
	followers: Array<string>;
	following: Array<string>;
	active: boolean;
	accessToken: string;
	createdAt: string;
	email: string;
	updatedAt: string;
}

export interface Profile {
	firstname: string;
	lastname: string;
	bio: string;
	privacy: string;
	gender: string;
}

export interface NotificationProps {
	_id: string;
	content: {
		type: string;
		id: string;
	};
	userId: string;
	liker: string;
	postbody: string;
	seen: boolean;
	createdAt: string;
	user: {
		_id: string;
		username: string;
		avatar: string;
	};
}

export interface Post {
	userId: string;
	body: string;
	createdAt: string;
	photos: Array<string>;
	comments: Array<string>;
	likes: Array<string>;
}

export interface HeadProps {
	user: User;
	currentUser: User;
	isFollowing: boolean;
}

export interface FollowersListProps {
	currentUser: User;
	open: boolean;
	setOpen: Function;
	userFollowers: Array<string>;
}
export interface FollowingListProps {
	currentUser: User;
	open: boolean;
	setOpen: Function;
	userFollowing: Array<string>;
}

export interface RedirectData {
	redirectURL: string;
}

export function isRedirectData(object: unknown): object is RedirectData {
	if (object !== null && typeof object === "object") {
		return "redirectURL" in object;
	}
}
