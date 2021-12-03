//fun chooseBestSum(t: Int, k: Int, ls: List<Int>): Int {
//    if(ls.sorted().takeLast(k).sum() <= t) return -1
//    val iv = "".padStart(k,'1').padEnd(ls.size,'0')
//}

fun List<Int>.findSubsets(size: Int): List<List<Int>> =
    this.map {
        when (size) {
            1 -> listOf(it)
            else -> this.drop(1).findSubsets(size-1).flatMap { s -> listOf(it).union(s) }
        }
    }

fun main() {
    val ls = listOf(50, 55, 56, 57, 58, 60)
    ls.findSubsets(3)
}