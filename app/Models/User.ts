import { DateTime } from 'luxon'
import { BaseModel, column,beforeSave,hasMany, HasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import Post from './Post'
import { v4 as uuidv4 } from 'uuid';
import Following from './Following'



export default class User extends BaseModel {

  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string
  
  @column()
  public email: string
  
  @column()
  public password: string

  @column()
  public username: string
  
  @column()
  public details: string
  
  @column()
  public avatar: string
  
  @column.dateTime()
  public email_verified_at: DateTime
  
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Following)
  public followings:HasMany<typeof Following>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async followers() {
    const followers = await Following.query().where('following_id', this.id)
    return followers.length
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  public async sendVerificationEmail() {
    const url = Env.get('APP_URL') + Route.makeSignedUrl('verifyEmail', {
      params: {
        email: this.email
      }
    }
      )
    
        await Mail.send((message) => {
        message
        .from('verify@adonisgram.com')
        .to(this.email)
        .subject('Please Verify your email!')
        .htmlView('emails/verify', { user:this, url})
     })
        
  }
}
