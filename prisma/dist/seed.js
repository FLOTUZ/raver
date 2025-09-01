"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var host;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.host.create({
                        data: {
                            name: "mani.codes",
                        },
                    })];
                case 1:
                    host = _a.sent();
                    console.log("✅ Host created");
                    // Crear User
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: "mani@manicodes.com",
                                name: "Emmanuel Esquivel",
                                role: client_1.Role.ADMIN,
                                password: "mani.codes",
                                host_id: host.id,
                            },
                        })];
                case 2:
                    // Crear User
                    _a.sent();
                    console.log("✅ User created");
                    // Crear Event
                    return [4 /*yield*/, prisma.event.create({
                            data: {
                                name: "🎃 Inauguración de RAVR - Noche de Disfraces 👻",
                                description: "\n\u00A1La espera termin\u00F3! Celebremos la **gran inauguraci\u00F3n de RAVR** con una fiesta de **disfraces de Halloween** que no olvidar\u00E1s.\n\nPrep\u00E1rate para una noche llena de misterio, diversi\u00F3n y sorpresas, donde la creatividad y la magia se apoderar\u00E1n del ambiente.  \n\n\u2728 Habr\u00E1 premios para los mejores disfraces, m\u00FAsica, y muchas experiencias aterradoras (pero divertidas).  \n\nVen con tu mejor disfraz y s\u00E9 parte del inicio de esta nueva etapa.  \nLa noche ser\u00E1 tuya\u2026 si te atreves. \uD83D\uDD77\uFE0F\uD83E\uDD87\n\n\uD83D\uDCCD **Lugar:** Calle 123, Ciudad, Pa\u00EDs  \n\uD83D\uDCC5 **Fecha:** 1 de enero de 2023  \n\uD83D\uDD59 **Hora:** 10:00 AM \u2013 12:00 PM\n      ",
                                image: "https://i.pinimg.com/736x/70/18/12/701812553630321ca103c55afc93c172.jpg",
                                banner: "https://i.pinimg.com/736x/ab/e6/34/abe634457a1419ef24dd7443a2ffdb21.jpg",
                                init_date: new Date("2023-01-01T00:00:00.000Z"),
                                end_date: new Date("2023-01-01T12:00:00.000Z"),
                                location: "Calle 123, Ciudad, País",
                                start_time: "10:00",
                                end_time: "12:00",
                                created_at: new Date("2023-01-01T00:00:00.000Z"),
                                updated_at: new Date("2023-01-01T00:00:00.000Z"),
                                host_id: host.id,
                            },
                        })];
                case 3:
                    // Crear Event
                    _a.sent();
                    console.log("🚀 Database has been seeded");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
