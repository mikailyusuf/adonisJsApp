import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { v4 as uuidv4 } from 'uuid';


export default class Post extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime


  @column()
  public userId: string

  @belongsTo(() => User)
  public user :BelongsTo<typeof User>

    @column()
    public caption: string
  
    @column()
  public image: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


   @beforeCreate()
  public static assignUuid(post: Post) {
    post.id = uuidv4()
  }
}
