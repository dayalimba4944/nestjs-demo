import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {

  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto) {

    const createModelData = new this.blogModel(createBlogDto);
    return createModelData.save();
  }

  findAll() {
    const createModelData = this.blogModel.find();
    return createModelData;
  }

  async findOne(id: string): Promise<Blog> {
    var data = this.blogModel.findById(id).exec();
    return data;
  }

  async findProfileByTitle(title: string): Promise<Blog> {
    var data = this.blogModel.findOne({ title }).exec();
    return data;
  }

  async findProfileByContent(content: string): Promise<Blog> {
    var data = this.blogModel.findOne({ content }).exec();
    return data;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    // return {
    //   updateBlogDto : updateBlogDto,
    //   id : id
    // };
  return   this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true }).exec();
  }

  remove(id: string) { 
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
