import { Injectable } from '@nestjs/common';
import csv from 'csvtojson';

@Injectable()
export class UploadService {
	async uploadCSV(file: any) {
		console.log(process.cwd() + '/' + file.path);
		const newData = await csv().fromFile(file.path);
		const returns = newData
			.map((item) => parseFloat(item.Price))
			.reduce((prev, curr) => prev + curr, 0);
		const absoluteTotal = returns / 100;
		console.log('Returns', absoluteTotal.toFixed(3));
		const sellData = newData.filter((item) => {
			return item.Direction === 'SELL';
		});
		console.log('Sell data', sellData);
		const totalSellPrice = sellData
			.map((item) => parseFloat(item.Price))
			.reduce((prev, curr) => prev + curr, 0);
		//   sell Consideration
		const totalSellConsideration = sellData
			.map((item) => parseFloat(item.Consideration))
			.reduce((prev, curr) => prev + curr, 0);
		return {
			success: true,
			message: 'Success',
			totalSellConsideration: totalSellConsideration / 100,
			totalSellPrice: totalSellPrice / 100,
			profit: totalSellConsideration - totalSellPrice,
			PriceTotal: absoluteTotal.toFixed(3),
			data: newData,
		};
	}
}
