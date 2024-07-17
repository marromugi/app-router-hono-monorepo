import { Hono } from "hono";
import { JwtVariables } from "hono/jwt";
import { Bindings } from "hono/types";

export const createApp = () => new Hono<{ Bindings: Bindings; Variables: JwtVariables }>()
