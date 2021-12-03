fun solution(input: String, markers: CharArray): String =
    "\\s*[${markers.joinToString("") { """\$it""" } }].*".apply(::println).toRegex().replace(input, "")

fun main() {
    var result = solution("avocado\n" +
            "tangerine - avocado pears kiwi avocado kiwi\n" +
            "grapes apples quinc...", charArrayOf('!', '-', '#'))
    println("breathe")
}