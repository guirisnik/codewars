fun longToIP(ip: UInt): String =
    "\\d{8}".toRegex().findAll(ip.toString(2).padStart(32, '0')).joinToString(".") { it.value.toInt(2).toString() }

fun main() {
    println(longToIP(2154959208u))
}