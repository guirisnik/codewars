class Memoize(val f: (String, String) -> String) : (String, String) -> String {
    private val cache = mutableMapOf<Pair<String, String>, String>()
    override fun invoke(p1: String, p2: String): String =
        when {
            p1.isEmpty() || p2.isEmpty() -> f(p1, p2)
            else -> cache.getOrPut(Pair(p1, p2)) { f(p1, p2) }
        }
}

fun ((String, String) -> String).memoize(): (String, String) -> String = Memoize(this)

fun dummyLcs(a: String, b: String): String =
    when {
        a.isEmpty() || b.isEmpty() -> ""
        a.last() == b.last() -> "${lcs(a.removeLastSymbol(), b.removeLastSymbol())}${a.last()}"
        else -> listOf(lcs(a.removeLastSymbol(), b), lcs(a, b.removeLastSymbol())).maxByOrNull { it.length } ?: ""
    }

fun String.removeLastSymbol() = subSequence(0 until lastIndex).toString()

val lcs = ::dummyLcs.memoize()

fun main() {
    val someLcs = lcs("abcdefghijklmnopq", "apcdefghijklmnobq")
    println(someLcs)
}