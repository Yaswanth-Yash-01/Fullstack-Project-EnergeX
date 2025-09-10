
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';


interface PostAttributes {
  id: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}


interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}


export class Post extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public created_at?: Date;
  public updated_at?: Date;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
    underscored: true,
  }
);


