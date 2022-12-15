import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'


export default class EmailVerifyController {

    public async index({ response, auth }: HttpContextContract) {
        auth.user?.sendVerificationEmail()
        return response.redirect('/welcome')
    }

    public async confirm({ response, params,request }: HttpContextContract) {

        if (request.hasValidSignature()) {
             const user = await User.findByOrFail('email',params.email)
            user.email_verified_at = DateTime.local()
            await user.save()
            return response.redirect(`/${user.username}`)
         }

     return 'Signature is missing or URL was tampered.'
      
    }
}

