---
title: Advent of Code 2024 Day8
date: 2024-12-08
tags:
  - "fsharp"
  - "AoC"
categories:
  - "contest"
  - "puzzle"
---

Today's question is easy to write in mutable languages, like Python, but hard to write in FP code.

Let me know if you have some ideas to simplify my F# code.

Let's improve our F# skills together! :D

```fsharp
type Day8(lines: string[]) =
    let R = lines.Length
    let C = lines[0].Length

    let getPoints (lines: string[]) : Map<char, Index array> =
        let points =
            [| for i in 0 .. R - 1 do
                   for j in 0 .. C - 1 do
                       if lines[i][j] <> '.' then
                           (lines[i][j], (i, j)) |]

        points
        |> Array.groupBy fst
        |> Map.ofArray
        |> Map.map (fun _ v -> v |> Array.map snd)


    let inBoard (i, j) : bool = 0 <= i && i < R && 0 <= j && j < C

    let getIdxPair (idx_list: Index array) =
        [ for i in 0 .. idx_list.Length - 2 do
              for j in i + 1 .. idx_list.Length - 1 do
                  (idx_list[i], idx_list[j]) ]

    let getAntinodes op (a: Index) (b: Index) : Index list =
        let ar, ac = a
        let br, bc = b

        let x = abs (ar - br)
        let y = abs (ac - bc)

        match ar < br, ac < bc with
        | true, true -> (-x, -y), (x, y)
        | true, false -> (-x, y), (x, -y)
        | false, true -> (x, -y), (-x, y)
        | false, false -> (x, y), (-x, -y)
        |> fun (d1, d2) -> op a d1 @ op b d2

    member this.Q1() =
        let points_dict = lines |> getPoints
        let getAntIdx (ar, ac) (dr, dc) = [ (ar + dr, ac + dc) ]

        points_dict.Values
        |> Array.ofSeq
        |> Seq.collect (fun idx_list ->
            idx_list
            |> getIdxPair
            |> List.collect (fun (l, r) -> getAntinodes getAntIdx l r))
        |> Seq.filter inBoard
        |> Set.ofSeq
        |> Seq.length

    member this.Q2() =
        let points_dict = lines |> getPoints

        let getAntinodesInLine (ar, ac) (x, y) =
            let rec loop (ar, ac) x y rst =
                if not (inBoard (ar, ac)) then
                    rst
                else
                    loop (ar + x, ac + y) x y ((ar, ac) :: rst)

            loop (ar, ac) x y []

        points_dict.Values
        |> Array.ofSeq
        |> Seq.collect (fun idx_list ->
            idx_list
            |> getIdxPair
            |> List.collect (fun (l, r) -> getAntinodes getAntinodesInLine l r))
        |> Set.ofSeq
        |> Seq.length

```

You can find the source code at [https://github.com/zangruizhe/AoC](https://github.com/zangruizhe/AoC)
