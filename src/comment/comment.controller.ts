import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, Res, Put } from '@nestjs/common';
import { CommentService } from './comment.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';


@ApiBearerAuth()        
@UseGuards(AuthGuard("jwt"))
@ApiTags("BinhLuan")
@Controller('api/')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // ============================================
  //            GET ALL COMMENT
  // ============================================ 
  @HttpCode(200)
  @Get("get-all-comment")
  getAllComment(@Res() res:Response){
    return this.commentService.getAllComment(res)
  }


  // ============================================
  //         GET COMMENT BY USER ID
  // ============================================ 
  @HttpCode(200)
  @Get("get-all-comment-by-user-id/:userID")
  getCommentByUserId(@Param("userID") userID:number, @Res() res: Response){
    return this.commentService.getCommentByUserId(userID, res)
  }


  // ============================================
  //         GET COMMENT BY ROOM ID
  // ============================================ 
  @HttpCode(200)
  @Get("get-all-comment-by-room-id/:roomID")
  getCommentByRoomId(@Param("roomID") roomID:number, @Res() res: Response){
    return this.commentService.getCommentByRoomId(roomID, res)
  }


  // ============================================
  //               POST COMMENT 
  // ============================================
  @HttpCode(201)
  @Post("post-comment")
  postComment(@Body() body:CreateCommentDto, @Res() res:Response){
    return this.commentService.postComment(body, res)
  }


  // ============================================
  //               PUT COMMENT 
  // ============================================
  @HttpCode(200)
  @Put("put-comment/:commentID")
    putComment(@Param("commentID") commentID:number, @Body() body:CreateCommentDto, @Res() res:Response){
    return this.commentService.putComment(commentID, body, res)
  }


  // ============================================
  //               DELETE COMMENT 
  // ============================================
  @HttpCode(200)
  @Delete("delete-comment/:commentID")
    deleteComment(@Param("commentID") commentID:number, @Res() res:Response){
    return this.commentService.deleteComment(commentID, res)
  }











}
