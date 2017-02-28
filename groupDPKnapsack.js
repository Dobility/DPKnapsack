/**
 * 分组背包问题
 * 2017年2月28日23:07:32
 * @author [Dobility]
 * 物品被分为若干组，每个组的物品互斥（这个组最多只能选1个）
 */

// i:物品分组
// k:物品标号
// w:重量
var MAX_I = 4, MAX_K = 3, MAX_W = 6, MAX_V = 20;
console.log("\n【Sample】 \ngroup: %d, overload: %d", MAX_I, MAX_W);

// 随机生成物品数据，数组放弃下标0
var goods = new Array(MAX_K + 1);
for (var i = 1; i <= MAX_I; i++) {
	goods[i] = new Array(MAX_K + 1);
	for (var k = 1; k <= MAX_K; k++) {
		goods[i][k] = {};
		goods[i][k].weight = Math.ceil(Math.random() * MAX_W);
		goods[i][k].value = Math.ceil(Math.random() * MAX_V);
	}
}

console.log(goods);

var V = new Array(MAX_I + 1);
var b = new Array(MAX_I + 1);
for (var i = 0; i <= MAX_I; i++) {
	V[i] = new Array(MAX_W + 1);
	b[i] = new Array(MAX_W + 1);
	for (var w = 0; w <= MAX_W; w++) {
		V[i][w] = new Array(MAX_K + 1);
		b[i][w] = new Array(MAX_K + 1);
		for (var k = 0; k <= MAX_K; k++) {
			V[i][w][k] = 0;
			b[i][w][k] = 0;
		}
	}
}

// 算法开始
for (var i = 1; i <= MAX_I; i++) {				// 每个分组
	for (var w = MAX_W; w >= 0; w--) {			// 每次讨论的最大负重，要包括 0
		for (var k = 1; k <= MAX_K; k++) {		// 每个分组中的每个物品
			if (goods[i][k].weight <= w) {
				var v1 = Math.max.apply(null, V[i-1][w]);
				var v2 = Math.max.apply(null, V[i-1][w - goods[i][k].weight]) + goods[i][k].value;
				if (v1 > v2) {
					V[i][w][k] = v1;
					b[i][w][k] = 0;
				} else {
					V[i][w][k] = v2;
					b[i][w][k] = 1;
					if (Math.max.apply(null, V[i-1][w - goods[i][k].weight]) == 9 && v2 == 29) {
						console.log(i-1, w - goods[i][k].weight);
					}
				}
			}
		}
	}
}

// 根据 b 打印出最佳方案的算法
console.log("\n【Solvement】");
var TOTAL_W = 0, TOTAL_V = 0;
function PrintKnapsackItem(i, w, k) {
	if (i == 0 || w == 0) {
		return 0;
	}
	if (b[i][w][k] == 1) {
		var _k = V[i-1][w - goods[i][k].weight].indexOf(Math.max.apply(null, V[i-1][w - goods[i][k].weight]));
		PrintKnapsackItem(i-1, w - goods[i][k].weight, _k);
		process.stdout.write("(" + i + ", " + k + "): ");
		console.log(goods[i][k]);
		TOTAL_W += goods[i][k].weight;
		TOTAL_V += goods[i][k].value;
	} else {
		var _k = V[i-1][w].indexOf(Math.max.apply(null, V[i-1][w]));
		PrintKnapsackItem(i-1, w, _k);
	}
}
PrintKnapsackItem(MAX_I, MAX_W, V[MAX_I][MAX_W].indexOf(Math.max.apply(null, V[MAX_I][MAX_W])));
console.log("---------------------------------\n   Sum:   weight: %d, value: %d", TOTAL_W, TOTAL_V);
