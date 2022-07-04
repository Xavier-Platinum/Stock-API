import {
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/Services/upload/upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file')
export class UploadController {
	constructor(private uploadService: UploadService) {}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: __dirname + '/assets/csv',
				filename: (req, file, cb) => {
					cb(
						null,
						`${
							Date.now() +
							file.originalname.split('.').slice(0, -1).join('.')
						}${extname(file.originalname)}`,
					);
				},
			}),
		}),
	)
	async uploadFile(@UploadedFile() file) {
		return this.uploadService.uploadCSV(file);
	}
}
