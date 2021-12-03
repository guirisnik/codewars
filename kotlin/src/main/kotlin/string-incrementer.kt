fun incrementString(str: String) =
    if(!str.contains("\\d+$".toRegex())) str + "1"
    else "\\d+$".toRegex().replace(str) { m -> m.value.let { it.toInt().inc().toString().padStart(it.length, '0') } }

fun main() {
    println(incrementString("foo00001"))
}