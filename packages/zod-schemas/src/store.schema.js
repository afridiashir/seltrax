"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCreateSchema = void 0;
const zod_1 = require("zod");
exports.storeCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Store name is required"),
});
//# sourceMappingURL=store.schema.js.map