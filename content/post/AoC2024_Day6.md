---
title: AoC 2024 Day6
date: 2024-12-06
tags:
  - "fsharp"
  - "AoC"
categories:
  - "contest"
  - "puzzle"
---

Tips for Q2: If the Guard moving to `the same direction at same position twice`, that means Guard is in a loop.

```fsharp
type Day6(lines: string[]) =
    let R = lines.Length
    let C = lines[0].Length

    let getStart (lines: string[]) =
        lines
        |> Array.indexed
        // |> Array.pick (fun (i, s) -> s |> Seq.tryFindIndex ((=) '^') |> Option.map (fun j -> (i, j)))
        |> Array.pick (fun (i, s) ->
            let j = s.IndexOf("^")
            if j <> -1 then Some(i, j) else None)

    let ops = [ (-1, 0); (0, 1); (1, 0); (0, -1) ]

    let rec moving i j op (pos_set: HashSet<Index>) =
        pos_set.Add((i, j)) |> ignore
        let next_i = i + fst ops[op]
        let next_j = j + snd ops[op]

        if next_i < 0 || next_i >= R || next_j < 0 || next_j >= C then
            pos_set
        elif lines[next_i][next_j] = '#' then
            moving i j ((op + 1) % 4) pos_set
        else
            moving next_i next_j op pos_set


    member this.Q1() =
        let start: Index = getStart lines
        let post_set = moving (fst start) (snd start) 0 (HashSet())
        post_set.Count

    member this.Q2() =
        let start: Index = getStart lines
        let pos_set = moving (fst start) (snd start) 0 (HashSet())
        pos_set.Remove(start) |> ignore
        let isInLoop (pos_set: HashSet<int * int * int>) i j op = pos_set.Add((i, j, op)) = false

        let rec checkLoop i j op (pos_set: HashSet<int * int * int>) =

            let next_i = i + fst ops[op]
            let next_j = j + snd ops[op]

            if next_i < 0 || next_i >= R || next_j < 0 || next_j >= C then
                false
            elif lines[next_i][next_j] = '#' then
                if isInLoop pos_set i j op then
                    true
                else
                    checkLoop i j ((op + 1) % 4) pos_set
            else
                checkLoop next_i next_j op pos_set


        pos_set
        |> Seq.filter (fun (i, j) ->
            let old = lines[i]
            let str = old.ToCharArray()
            str[j] <- '#'
            lines[i] <- String(str)
            let rst = checkLoop (fst start) (snd start) 0 (HashSet())
            lines[i] <- old
            rst)
        |> Seq.length

```