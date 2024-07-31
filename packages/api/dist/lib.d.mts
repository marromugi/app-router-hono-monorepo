import * as hono_hono_base from 'hono/hono-base';
import * as hono_utils_http_status from 'hono/utils/http-status';
import * as hono_types from 'hono/types';

declare const route: hono_hono_base.HonoBase<hono_types.BlankEnv, {
    "/api/sheet/:id/payment/:paymentId": {
        $delete: {
            input: {
                param: {
                    id: string | undefined;
                    paymentId: string | undefined;
                } & {
                    id: string;
                    paymentId: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                param: {
                    id: string | undefined;
                    paymentId: string | undefined;
                } & {
                    id: string;
                    paymentId: string;
                };
            };
            output: {
                message: string;
                subMessage: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/sheet/:id/payment": {
        $post: {
            input: {
                json: {
                    userId: string;
                    amount: number;
                    category: "eat" | "play" | "house" | "daily-use-items" | "travel";
                    splitting: {
                        userId: string;
                        amount: number;
                        percentage: number;
                    }[];
                    title?: string | undefined;
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                id: string;
                paymentId: string;
                title: string;
                amount: number;
                status: string;
                sheetId: string;
                sheetUserId: string;
                createdAt: string;
                updatedAt: string;
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                json: {
                    userId: string;
                    amount: number;
                    category: "eat" | "play" | "house" | "daily-use-items" | "travel";
                    splitting: {
                        userId: string;
                        amount: number;
                        percentage: number;
                    }[];
                    title?: string | undefined;
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/sheet/:id/user": {
        $get: {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                users: {
                    id: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                    nickname: string;
                }[];
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {};
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/sheet/:id/me": {
        $get: {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                id: string;
                color: string;
                nickname: string;
            } | null;
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {};
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/sheet/:id": {
        $get: {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    id: string;
                };
            };
            output: {
                id: string;
                title: string;
                payments: {
                    title: string;
                    createdAt: string;
                    sheetUser: {
                        id: string;
                        color: string;
                        nickname: string;
                    };
                    paymentId: string;
                    amount: number;
                    splits: {
                        sheetUser: {
                            id: string;
                            color: string;
                            nickname: string;
                        };
                        amount: number;
                        percentage: number;
                    }[];
                }[];
                sheetUsers: {
                    id: string;
                    nickname: string;
                }[];
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                param: {
                    id: string | undefined;
                } & {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/sheet": {
        $post: {
            input: {
                json: {
                    name: string;
                    userId: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                    title: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    name: string;
                    userId: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                    title: string;
                };
            };
            output: {
                code: string;
                id: string;
                code_expired_at: string;
            };
            outputFormat: "json";
            status: 200;
        };
        $get: {
            input: {};
            output: {
                sheets: {
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    sheetUsers: {
                        id: string;
                        color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                        nickname: string;
                    }[];
                    title?: string | undefined;
                }[];
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/me": {
        $get: {
            input: {};
            output: {
                id: string;
                name: string;
            } | null;
            outputFormat: "json";
            status: 200;
        } | {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/*": {};
} & {
    "/api/sheet/:id/register": {
        $post: {
            input: {
                json: {
                    code: string;
                    name: string;
                    userId: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                message: string;
                subMessage: null;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                json: {
                    code: string;
                    name: string;
                    userId: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                message: string;
                subMessage: string;
                type: "max-members" | "invalid-code" | "already-registered";
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                json: {
                    code: string;
                    name: string;
                    userId: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                code: string;
                id: string;
                code_expired_at: string;
                sheetUsers: {
                    userId: string;
                }[];
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                json: {
                    code: string;
                    name: string;
                    userId: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
        $get: {
            input: {
                query: {
                    code: string | string[];
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                message: string;
                subMessage: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                query: {
                    code: string | string[];
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                id: string;
                createdAt: string;
                sheetUsers: {
                    id: string;
                    color: "red" | "blue" | "green" | "purple" | "yellow" | "lime";
                    nickname: string;
                }[];
                title?: string | undefined;
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                query: {
                    code: string | string[];
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: null;
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                query: {
                    code: string | string[];
                };
                param: {
                    id: string | undefined;
                } & {
                    [x: string]: string;
                    [x: number]: string;
                    [x: symbol]: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/signup": {
        $post: {
            input: {
                json: {
                    id: string;
                    password: string;
                    name: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                json: {
                    id: string;
                    password: string;
                    name: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/login": {
        $post: {
            input: {
                json: {
                    id: string;
                    password: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    id: string;
                    password: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                json: {
                    id: string;
                    password: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/example": {
        $get: {
            input: {};
            output: "Hello 🔥";
            outputFormat: "text";
            status: hono_utils_http_status.StatusCode;
        };
    };
}, "/api">;

declare const COOKIE_ID: {
    readonly accessToken: "nhp-at";
    readonly sheetUser: (sheetId: string) => string;
};

type ApiType = typeof route;

export { type ApiType, COOKIE_ID };
