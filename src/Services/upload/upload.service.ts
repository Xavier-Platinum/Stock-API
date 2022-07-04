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
		// console.log('Returns', absoluteTotal.toFixed(3));
		const sellData = newData.filter((item) => {
			return item.Direction === 'SELL';
		});
		// console.log('Sell data', sellData);
		const totalSellPrice = sellData
			.map((item) => parseFloat(item.Price))
			.reduce((prev, curr) => prev + curr, 0);
		//   sell Consideration
		const totalSellConsideration = sellData
			.map((item) => parseFloat(item.Consideration))
			.reduce((prev, curr) => prev + curr, 0);
		const actualTotalSellConsideration = totalSellConsideration / 100;
		const actualTotalSellPrice = totalSellPrice / 100;
		const totalSellProfit =
			actualTotalSellPrice - actualTotalSellConsideration;
		return {
			success: true,
			message: 'Success',
			totalSellConsideration: actualTotalSellConsideration,
			totalSellPrice: actualTotalSellPrice,
			profit: totalSellProfit,
			loss: totalSellProfit >= 0 ? 0 : totalSellProfit,
			PriceTotal: absoluteTotal.toFixed(3),
			data: newData,
		};
	}
}
