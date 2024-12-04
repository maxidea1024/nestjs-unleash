import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from "@nestjs/common";
// eslint-disable-next-line node/no-unpublished-import
import type { Request } from "express";
import type { User, UsersService } from "./users.service";

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private readonly users: UsersService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();

		let user: User | undefined;

		const id = request.headers["x-user-id"];

		if (typeof id === "string") {
			user = this.users.find(Number.parseInt(id, 10));
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			request.user = user;
		}

		return true;
	}
}
