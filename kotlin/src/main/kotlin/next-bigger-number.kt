fun nextBiggerNumber(n: Long): Long {
    var m = n
    while (!n.hasSameDigitsAs(m.plus(1)))
        m++
    return m.plus(1)
}

fun Long.hasSameDigitsAs(n: Long) =
    this.digitFrequency() == n.digitFrequency()

fun Long.digitFrequency() =
    this.toString().groupingBy { it }.eachCount()

fun main() {
    val nbn = nextBiggerNumber(144)
    println(nbn)
}