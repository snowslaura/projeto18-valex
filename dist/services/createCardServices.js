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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import { findById } from "../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId, insert } from "../repositories/cardRepository.js";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);
import Cryptr from "cryptr";
export function createCard(type, idEmployee) {
    return __awaiter(this, void 0, void 0, function () {
        var CardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkEmployee(idEmployee)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, checkEmployeeTypes(type, idEmployee)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, setCardData(idEmployee, type)];
                case 3:
                    CardData = _a.sent();
                    return [4 /*yield*/, InsertCard(CardData)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function checkEmployee(idEmployee) {
    return __awaiter(this, void 0, void 0, function () {
        var employeeExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(idEmployee)];
                case 1:
                    employeeExists = _a.sent();
                    if (!employeeExists)
                        throw {
                            type: "not_found",
                            message: "Employee not found"
                        };
                    return [2 /*return*/];
            }
        });
    });
}
function checkEmployeeTypes(type, idEmployee) {
    return __awaiter(this, void 0, void 0, function () {
        var typeEmployeeExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findByTypeAndEmployeeId(type, idEmployee)];
                case 1:
                    typeEmployeeExists = _a.sent();
                    if (typeEmployeeExists)
                        throw {
                            type: "not_found",
                            message: "Type already exists"
                        };
                    return [2 /*return*/];
            }
        });
    });
}
function setCardData(idEmployee, type) {
    return __awaiter(this, void 0, void 0, function () {
        var number, employeeId, cardholderName, securityCode, expirationDate, password, isVirtual, originalCardId, isBlocked, cardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    number = setCardNumber();
                    employeeId = idEmployee;
                    return [4 /*yield*/, setCardHolderName(idEmployee)];
                case 1:
                    cardholderName = _a.sent();
                    securityCode = setSecurityCode();
                    expirationDate = setExpirationDate();
                    password = null;
                    isVirtual = false;
                    originalCardId = null;
                    isBlocked = true;
                    cardData = {
                        employeeId: employeeId,
                        number: number,
                        cardholderName: cardholderName,
                        securityCode: securityCode,
                        expirationDate: expirationDate,
                        password: password,
                        isVirtual: isVirtual,
                        originalCardId: originalCardId,
                        isBlocked: isBlocked,
                        type: type
                    };
                    return [2 /*return*/, cardData];
            }
        });
    });
}
function setCardNumber() {
    return faker.finance.creditCardNumber('VISA');
}
function setCardHolderName(idEmployee) {
    return __awaiter(this, void 0, void 0, function () {
        var employeeData, employeeName, employeeNameArray, length, firstName, lastName, middleNames, middleNamesfirstLetters, middleNamefirstLettersString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(idEmployee)];
                case 1:
                    employeeData = _a.sent();
                    employeeName = employeeData.fullName;
                    employeeNameArray = employeeName.split(' ');
                    length = employeeNameArray.length;
                    firstName = employeeNameArray.at(0);
                    lastName = employeeNameArray.at(length - 1);
                    middleNames = employeeNameArray.slice(1, length - 1);
                    middleNamesfirstLetters = middleNames.map(function (name) {
                        if (name.length > 2) {
                            return name.at(0);
                        }
                    });
                    middleNamefirstLettersString = middleNamesfirstLetters.join(" ").toString().trim();
                    return [2 /*return*/, "".concat(firstName.toUpperCase(), " ").concat(middleNamefirstLettersString.toUpperCase(), " ").concat(lastName.toUpperCase())];
            }
        });
    });
}
function setSecurityCode() {
    var CVV = faker.random.numeric(3);
    var cryptr = new Cryptr('myTotallySecretKey');
    return cryptr.encrypt(CVV);
}
function setExpirationDate() {
    var expirationDate = dayjs().locale('pt-br').add(5, 'years').format('MM/YY');
    return expirationDate;
}
function InsertCard(CardData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert(CardData)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
