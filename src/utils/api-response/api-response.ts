import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

import { argsExample, translate, translations } from '../translations/tr_methods';

type messageType = keyof typeof translations.ar
type messageLang = keyof typeof translations
let statusInstance = Object.assign({}, HttpStatus)
type StatusCode = keyof typeof statusInstance
export class ApiResponse {
  static successResponse(lang: messageLang, messageKey: messageType, status: StatusCode, data?: object, args?: argsExample) {
    let message = translate(lang, messageKey, args)
    return { message, data, status: HttpStatus[status] }; // message doesn't has meta pagination only string
  }

  static findWithMeta(lang: messageLang, messageKey: messageType, status: StatusCode, meta: any, data?: object, args?: argsExample) {
    let message = translate(lang, messageKey, args)
    return { message, meta, data, status: HttpStatus[status] }; // message doesn't has meta pagination only string
  }

  static errorResponse(lang: messageLang, messageKey: messageType, status: StatusCode, api: string, args?: argsExample, errors = {}) {

    if (errors["sqlMessage"]) {
      let sqlMessage: string = errors["sqlMessage"]
      if (sqlMessage.includes('Duplicate')) {
        let [, , duplicatedValue] = sqlMessage.split(' ')
        messageKey = "DUPLICATED"
        args = { "{value}": duplicatedValue }
      }
    }
    let message = translate(lang, messageKey, args)
    return { message, errors, status: HttpStatus[status] }
  }

  static errorThrowResponse(lang: messageLang, messageKey: messageType, status: StatusCode, api: string, args?: argsExample) {
    let message = translate(lang, messageKey, args)
    throw new HttpException({ message, api }, HttpStatus[status])
  }
  static thhrowValidationResponse(lang: messageLang, messageKey: messageType, status: StatusCode, api: string, errors: object, args?: argsExample) {
    let message = translate(lang, messageKey, args)
    throw new HttpException({ message, errors, api }, HttpStatus[status])
  }

  static notFoundResponse(lang: messageLang, messageKey: messageType, args?: argsExample) {
    let message = translate(lang, messageKey, args)
    throw new NotFoundException(message)
  }
}
