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
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.runDB = runDB;
const mongodb_1 = require("mongodb");
const index_1 = require("../settings/index");
const collections_1 = require("./collections");
function runDB(url) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.client = new mongodb_1.MongoClient(url);
        const db = exports.client.db(index_1.SETTINGS.MONGO_URL);
        (0, collections_1.initCollections)(db);
        try {
            yield exports.client.connect();
            yield db.command({ ping: 1 });
            console.log("linked to database");
        }
        catch (e) {
            yield exports.client.close();
            throw new Error(`problem with database ${e}`);
        }
    });
}
