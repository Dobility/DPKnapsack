/**
 * 二维分组背包问题
 * 2017年3月1日09:59:57
 * @author [Dobility]
 * 背包具有两个限制，物品被分组，每个组内元素互斥
 * 在本例中，两个限制为重量和数量
 * “数量”使得物品的另一个属性(num)固定取1
 */

// i:物品分组
// k:物品标号
// w:重量
var MAX_I = 4, MAX_K = 3, MAX_W = 6, MAX_V = 20, MAX_N = 2;
console.log("\n【Sample】 \ngroup: %d, limit: %d, overload: %d", MAX_I, MAX_N,MAX_W);

// 随机生成物品数据，数组放弃下标0
var goods = new Array(MAX_K + 1);
for (var i = 1; i <= MAX_I; i++) {
	goods[i] = new Array(MAX_K + 1);
	for (var k = 1; k <= MAX_K; k++) {
		goods[i][k] = {};
		goods[i][k].weight = Math.ceil(Math.random() * MAX_W);
		goods[i][k].value = Math.ceil(Math.random() * MAX_V);
		goods[i][k].num = 1;
	}
}

console.log(goods);

var V = new Array(MAX_I + 1);
var b = new Array(MAX_I + 1);
for (var i = 0; i <= MAX_I; i++) {
	V[i] = new Array(MAX_W + 1);
	b[i] = new Array(MAX_W + 1);
	for (var w = 0; w <= MAX_W; w++) {
		V[i][w] = new Array(MAX_N + 1);
		b[i][w] = new Array(MAX_N + 1);
		for (n = 0; n <= MAX_N; n++) {
			V[i][w][n] = new Array(MAX_K + 1);
			b[i][w][n] = new Array(MAX_K + 1);
			for (var k = 0; k <= MAX_K; k++) {
				V[i][w][n][k] = 0;
				b[i][w][n][k] = 0;
			}
		}
	}
}

// 算法开始
for (var i = 1; i <= MAX_I; i++) {					// 每个分组
	for (var w = MAX_W; w >= 0; w--) {				// 每次讨论的最大负重，要包括 0
		for (var n = MAX_N; n >= 0; n--) {
			for (var k = 1; k <= MAX_K; k++) {		// 每个分组中的每个物品
				if (goods[i][k].weight > w || goods[i][k].num > n) {
					// goods[i][k]超重，或者不超重但超数，一定放不下，和放之前一样
					V[i][w][n][k] = Math.max.apply(null, V[i-1][w][n]);
				} else {
					var v1 = Math.max.apply(null, V[i-1][w - goods[i][k].weight][n - goods[i][k].num]) + goods[i][k].value;
					var v2 = Math.max.apply(null, V[i-1][w][n]);
					if (v1 > v2) {
						V[i][w][n][k] = v1;
						b[i][w][n][k] = 1;
					} else {
						V[i][w][n][k] = v2;
					}
				}
			}
		}
	}
}

// 根据 b 打印出最佳方案的算法
console.log("\n【Solvement】");
var TOTAL_W = 0, TOTAL_V = 0;
function PrintKnapsackItem(i, w, n, k) {
	if (i == 0 || w == 0 || n == 0) {
		return 0;
	}
	if (b[i][w][n][k] == 1) {
		var _V = V[i-1][w - goods[i][k].weight][n - goods[i][k].num];
		var _k = _V.indexOf(Math.max.apply(null, _V));
		PrintKnapsackItem(i-1, w - goods[i][k].weight, n - goods[i][k].num, _k);
		process.stdout.write("(" + i + ", " + k + "): ");
		console.log(goods[i][k]);
		TOTAL_W += goods[i][k].weight;
		TOTAL_V += goods[i][k].value;
	} else {
		var _k = V[i-1][w][n].indexOf(Math.max.apply(null, V[i-1][w][n]));
		PrintKnapsackItem(i-1, w, n, _k);
	}
}
PrintKnapsackItem(MAX_I, MAX_W, MAX_N, V[MAX_I][MAX_W][MAX_N].indexOf(Math.max.apply(null, V[MAX_I][MAX_W][MAX_N])));
console.log("---------------------------------\n   Sum:   weight: %d, value: %d", TOTAL_W, TOTAL_V);
