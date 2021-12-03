object TimeFormatter {
    private const val YEAR = 60 * 60 * 24 * 365
    private const val DAY = 60 * 60 * 24
    private const val HOUR = 60 * 60
    private const val MINUTE = 60
    infix fun <T> Boolean.then(param: T): T? = if (this) param else null
    fun formatDuration(seconds: Int) =
        listOf(
            "year" to seconds.div(YEAR),
            "day" to seconds.mod(YEAR).div(DAY),
            "hour" to seconds.mod(DAY).div(HOUR),
            "minute" to seconds.mod(HOUR).div(MINUTE),
            "second" to seconds.mod(MINUTE)
        )
            .filter { it.second > 0 }
            .map { "${it.second} ${it.first}${(it.second > 1) then "s" ?: ""}" }
            .let {
                when (it.size) {
                    0 -> ""
                    1 -> it.first()
                    else -> it.take(it.size-1).joinToString(", ") + " and ${it.last()}"
                }
            }
}