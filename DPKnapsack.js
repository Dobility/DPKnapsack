/**
 * 基本01背包问题
 * 2017年2月28日23:07:32
 * @author [Dobility]
 * 背包只有重量限制，求最佳放置方案使得价值之和最大
 */


// i:物品序号
// w:重量
var MAX_I = 4, MAX_W = 6, MAX_V = 20;
console.log("\n【Sample】 \noverload: %d", MAX_W);

// 随机生成物品数据，数组放弃下标0
var goods = new Array(MAX_I + 1);
for (var i = 1; i <= MAX_I; i++) {
	goods[i] = {};
	goods[i].weight = Math.ceil(Math.random() * MAX_W);
	goods[i].value = Math.ceil(Math.random() * MAX_V);
}

console.log(goods);

var V = new Array(MAX_I + 1);
var b = new Array(MAX_I + 1);
for (var i = 0; i <= MAX_I; i++) {
	V[i] = new Array(MAX_W + 1);
	b[i] = new Array(MAX_W + 1);
	for (var w = 0; w <= MAX_W; w++) {
		V[i][w] = 0;
		b[i][w] = 0;
	}
}

// 算法开始
for (var i = 1; i <= MAX_I; i++) {				// 每个分组
	for (var w = MAX_W; w >= 0; w--) {			// 每次讨论的最大负重，要包括 0
		if (goods[i].weight <= w) {
			var v1 = V[i-1][w];
			var v2 = V[i-1][w - goods[i].weight] + goods[i].value;
			if (v1 > v2) {
				V[i][w] = v1;
				b[i][w] = 0;
			} else {
				V[i][w] = v2;
				b[i][w] = 1;
			}
		} else {
			V[i][w] = V[i-1][w];
		}
	}
}

// 根据 b 打印出最佳方案的算法
console.log("\n【Solvement】");
var TOTAL_W = 0, TOTAL_V = 0;
function PrintKnapsackItem(i, w) {
	if (i == 0 || w == 0) {
		return 0;
	}
	if (b[i][w] == 1) {
		PrintKnapsackItem(i-1, w - goods[i].weight);
		process.stdout.write(i + ": ");
		console.log(goods[i]);
		TOTAL_W += goods[i].weight;
		TOTAL_V += goods[i].value;
	} else {
		PrintKnapsackItem(i-1, w);
	}
}
PrintKnapsackItem(MAX_I, MAX_W);
console.log("---------------------------\nSum: weight: %d, value: %d", TOTAL_W, TOTAL_V);
