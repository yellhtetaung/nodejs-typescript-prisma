export interface Users {
	id?: string;
	username: string;
	email: string;
	password: string;
	role?: "USER" | "ADMIN";
	image?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
