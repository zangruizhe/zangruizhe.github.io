---
title: AoC 2024 Day3
date: 2024-12-04
tags:
  - "fsharp"
  - "AoC"
categories:
  - "contest"
  - "puzzle"
---

Today's question should process the `whole input together`.

If you process input line by line, you can pass Q1, but `can not` pass Q2

```fsharp
module Day3 =
    let Q1 (lines: string[]) =
        let str = String.Concat(lines)
        str |> split2IntByReg "mul\((\d+),(\d+)\)" |> Array.sumBy (fun n -> n[0] * n[1])

    let Q2 (lines: string[]) =
        let str = String.Concat(lines)

        Regex.Matches(str, @"mul\((\d+),(\d+)\)|don't\(\)|do\(\)")
        |> Seq.fold
            (fun (l, isEnable) m ->
                if m.Value.StartsWith("mul") then
                    if isEnable then
                        l @ [ (int m.Groups[1].Value, int m.Groups[2].Value) ], isEnable
                    else
                        l, isEnable
                elif m.Value = "do()" then
                    l, true
                elif m.Value = "don't()" then
                    l, false
                else
                    failwith $"wrong patten m={m.Value}")
            ([], true)
        |> fst
        |> Seq.sumBy (fun (l, r) -> l * r)


```
