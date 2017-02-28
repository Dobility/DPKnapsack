/**
 * 二维背包问题
 * 2017年2月28日23:07:32
 * @author [Dobility]
 * 背包具有两个限制
 * 在本例中，两个限制为重量和数量
 * “数量”使得物品的另一个属性(num)固定取1
 */

// i:物品标号
// w:重量
// n:数量
var MAX_I = 4, MAX_W = 6, MAX_N = 2, MAX_V = 20;
console.log("\n【Sample】 \ntotal limit: %d, overload: %d", MAX_N, MAX_W);

// 随机生成物品数据，数组放弃下标0
var goods = new Array(MAX_I + 1);
for (var i = 1; i <= MAX_I; i++) {
	goods[i] = {};
	goods[i].weight = Math.ceil(Math.random() * MAX_W);
	goods[i].value = Math.ceil(Math.random() * MAX_V);
	goods[i].num = 1;
}

console.log(goods);

// 三维矩阵
// V[i, w, n]
var V = new Array(MAX_I);		// 记录价值总和
var b = new Array(MAX_I);		// 记录路径
for (var i = 0; i <= MAX_I; i++) {
	V[i] = new Array(MAX_W);
	b[i] = new Array(MAX_W);
	for (var w = 0; w <= MAX_W; w++) {
		V[i][w] = new Array(MAX_N);
		b[i][w] = new Array(MAX_N);
		for (var n = 0; n <= MAX_N; n++) {
			V[i][w][n] = 0;
			b[i][w][n] = 0;
		}
	}
}

// 从第二面，算法开始
for (var i = 1; i <= MAX_I; i++) {
	for (var w = MAX_W; w >= 0; w--) {
		for (var n = MAX_N; n >= 0; n--) {
			if (goods[i].weight > w || (goods[i].weight <= w && goods[i].num > n)) {
				// goods[i]超重，或者不超重但超数，一定放不下，和放之前一样
				V[i][w][n] = V[i-1][w][n];
				b[i][w][n] = 0;
			} else {
				// 未超重且未超数，要看看怎么和其他东西搭配
				var v1 = V[i-1][w-goods[i].weight][n-goods[i].num] + goods[i].value;
				var v2 = V[i-1][w][n];
				if (v1 > v2) {
					V[i][w][n] = v1;
					b[i][w][n] = 1;
				} else {
					V[i][w][n] = v2;
					b[i][w][n] = 0;
				}
			}
		}
	}
}

// 根据 b 打印出最佳方案的算法
console.log("\n【Solvement】");
var TOTAL_W = 0, TOTAL_V = 0;
function PrintKnapsackItem(i, w, n) {
	if (i == 0 || w == 0 || n == 0) {
		return 0;
	}
	if (b[i][w][n] == 1) {
		PrintKnapsackItem(i-1, w - goods[i].weight, n - goods[i].num);
		process.stdout.write(i + ": ");
		console.log(goods[i]);
		TOTAL_W += goods[i].weight;
		TOTAL_V += goods[i].value;
	} else {
		PrintKnapsackItem(i-1, w, n);
	}
}
PrintKnapsackItem(MAX_I, MAX_W, MAX_N);
console.log("---------------------------\nSum: weight: %d, value: %d", TOTAL_W, TOTAL_V);
