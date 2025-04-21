---
title: Advent of Code 2024 Day9
date: 2024-12-09
tags:
  - "fsharp"
  - "AoC"
categories:
  - "contest"
  - "puzzle"
---

AoC 2024 Day9 F# solution #AdventOfCode #fsharp

Today, my solution takes 5 seconds to get the result, which means my algorithm is not good enough because AoC questions usually only take 1 second to get the result.

let me know if you have some good ideas. :D

```fsharp
type Day9(lines: string[]) =
    member this.Q1() =
        let transform (l: string) =
            l
            |> Seq.mapi (fun i c ->
                let n = char2Int c

                if i % 2 = 0 then
                    Array.init n (fun _ -> $"{i / 2}")
                else
                    Array.init n (fun _ -> "."))
            |> Seq.concat
            |> Seq.toArray

        let lines = String.Join("", lines) |> transform

        let rec shift i j =
            if i < j then
                match lines[i] = ".", lines[j] <> "." with
                | true, true ->
                    lines[i] <- lines[j]
                    lines[j] <- "."
                    shift (i + 1) (j - 1)
                | true, false -> shift i (j - 1)
                | false, true -> shift (i + 1) j
                | false, false -> shift (i + 1) (j - 1)

        shift 0 (lines.Length - 1)

        lines
        |> Array.mapi (fun i c -> if c <> "." then int64 i * (int64 c) else 0L)
        |> Array.sum

    member this.Q2() =
        let transform (l: string) =
            l
            |> Seq.mapi (fun i c ->
                let n = char2Int c

                if i % 2 = 0 then
                    Array.init n (fun idx -> (idx + 1, $"{i / 2}"))
                else
                    Array.init n (fun idx -> (n - idx, ".")))
            |> Seq.concat
            |> Seq.toArray

        let lines = String.Join("", lines) |> transform

        let rec shift i j =
            let ni, ci = lines[i]
            let nj, cj = lines[j]

            if i < j then
                match ci = ".", cj <> ".", ni >= nj with
                | true, true, true ->
                    for n in 0 .. nj - 1 do
                        lines[i + nj - n - 1] <- lines[j - n]
                        lines[j - n] <- (fst lines[j - n], ".")

                    shift 0 (j - nj)
                | true, true, false -> shift (i + ni) j
                | false, true, _ -> shift (i + 1) j
                | true, false, _ -> shift i (j - 1)
                | false, false, _ -> shift (i + 1) (j - 1)
            elif cj <> "." && j - nj > 0 then
                shift 0 (j - nj)

        shift 0 (lines.Length - 1)

        lines
        |> Array.mapi (fun i (_, c) -> if c <> "." then int64 i * (int64 c) else 0L)
        |> Array.sum

```

You can find the source code at [https://github.com/zangruizhe/AoC](https://github.com/zangruizhe/AoC)
