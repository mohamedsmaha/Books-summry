let text1 = `
19
Fingerprinting
Martin Dietzfelbinger
Technische Universit¨at Ilmenau, Ilmenau, Germany
How to Compare Long Texts over the Telephone
Alice and Bob are very good friends. Alice lives in Adelaide in Australia,
and Bob lives in Barnsley in (Great) Britain. They love to talk to each other
on their cellphones, but this can cost quite some money when they talk for
long. The two of them share many interests, and they are interested in lots
of things. So it comes as no surprise that they both buy an encyclopedia.
They tell each other about their acquisition on the phone. What a surprise
– they both bought the same encyclopedia! On the phone, Alice asks Bob
a simple question: Do both copies contain exactly the same text? Are they
really identical, word by word, comma by comma?
Even if Alice and Bob figure out that both have bought the 37th edition
of the encyclopedia, say, this does not necessarily mean that the copy that
was printed in Australia contains exactly the same text as the one that was
printed in England. Maybe some misprints were corrected? How can they
find out whether both copies are really identical? Alice could read her copy
to Bob, on the phone. Bob would read along and compare each word and
each punctuation mark. This would do the job, but it would cost a hell
of a lot in telephone charges (at least if the two use their cellphones), because Alice and Bob have chosen quite a voluminous encyclopedia: 12 volumes, about 1,500 pages per volume, about 2,800 characters per page; all in
B. V¨ocking et al. (eds.), Algorithms Unplugged,
DOI 10.1007/978-3-642-15328-0 19, c Springer-Verlag Berlin Heidelberg 2011
182 Martin Dietzfelbinger
all about 18,000 pages and about 50 million characters. If Alice needs only
five minutes to read one page, and they work on it without any breaks, the
two of them and the phone tariff unit counter will be busy for more than
60 days.
In a computer, we may represent a character, including commas, spaces,
and line and page breaks, by a binary code, e.g., with eight bits (one byte) per
character. For the whole encyclopedia this will amount to 50 million bytes,
or about 50 Megabytes. Let us assume that Alice and Bob have individually
managed to enter the text of their respective copies into a computer. As soon
as the encyclopedia is stored electronically, it is actually no big deal to send
this amount of data from Australia to England by e-mail. For the sake of
argument, let us assume however that the connection is either very expensive
or very error-prone, so that the transmission of such a large amount of data
via e-mail is impossible or undesirable.
Is there a way for Alice and Bob to find out whether the two texts are
identical without comparing them character by character? They would prefer
to carry out any conversation needed by cellphone, and hence keep the amount
of information that has to be exchanged very small.
If you sometimes send large files via e-mail or if you ever found it necessary
to make room on your brimful hard disk, you know that there are methods
that do something called “data compression.” By such methods, one “squeezes
together” data such as texts or images, so that they take up less space and
transmission times are shorter. Alice and Bob could use such methods. But
even if they manage to achieve a compression to, say, a fifth of the original
length of their data, it would still take too long to carry out the communication. So, data compression does not solve the problem.
Here is a very simple observation: Alice should start by counting the characters in her encyclopedia. Let us denote the result by n. Alice tells Bob what
n is, which means reading out eight decimal digits, which is a matter of seconds. Bob also has counted the characters in his copy, with a result of n
.
If n and n are different, Bob can announce that the texts are different. (We
assume that Alice and Bob haven’t miscounted.) From now on we may assume
the texts of Alice and Bob have exactly the same length.
Texts as Sequences of Numbers and Modular Arithmetic
Our long-term goal is to find a trick that makes it possible to solve the text
comparison problem with very short messages. For this, we want to translate
texts into numbers and then calculate with these numbers. A little basic work
is needed for this. We already noted that in a computer each character is
represented by a sequence of eight bits, that is, a byte. A standard way of
doing this is given by the ASCII code. In this code, the characters A, B, C,...
look like this: 01000001, 01000010, 01000011, etc. These bit patterns can also
19 Fingerprinting 183
be regarded as binary representations of numbers. In this way, we reach the
following way of coding characters by numbers:
ABC ··· Zabc ··· z
65 66 67 ··· 90 97 98 99 ··· 122
The punctuation marks are assigned numbers as well: for example, the exclamation mark (“!”) has number 33 and the space (“ ”) has number 32. In this
way, every character is represented by a number between 0 and 255. The text
Alice and Bob have a chat.
including spaces and the period translates into
65 108 105 99 101 32 97 110 100 32 66 111 98 32
104 97 118 101 32 97 32 99 104 97 116 46,
which we write “mathematically” as a sequence
(65, 108, 105, 99, 101, 32, 97, 110, 100, 32, 66, 111, 98, 32,
104, 97, 118, 101, 32, 97, 32, 99, 104, 97, 116, 46).
Now we can imagine that Alice has translated her whole encyclopedia into
one long sequence
TA = (a1, a2,...,an−1, an)
of numbers between 0 and 255, and that Bob has done the same with his copy:
TB = (b1, b2,...,bn−1, bn).
Here n is about 50 million, and you see that it is impossible to write down
sequences as long as that in this little book. As a manageable example we
take two sequences of length n = 8:
Texts (“Adelaide” and “Barnsley”) as sequences of numbers
TAd = (a1, a2,...,a8) = (65, 100, 101, 108, 97, 105, 100, 101)
TBa = (b1, b2,...,b8) = (66, 97, 114, 110, 115, 108, 101, 121)
Now we want to calculate with these number sequences. For this we need
a method that has been mentioned already in Chap. 17 and will be explained
in more detail in Chap. 25: “modular arithmetic.” Taking an arbitrary integer
a modulo an integer m > 1 simply means that one calculates the remainder
when a is divided by m; in other words, one counts how many steps one
has to walk to the left on the number line, starting at a, until one hits a
multiple of m. We write a mod m for this number. For example, if m = 7,
then 16 mod 7 = 2 and −4 mod 7 = 3. In the following table you find some
more values of a mod 7. You will spot the pattern at once: if you walk along
the number line to the right, the values of the remainders a mod m run around
{0, 1,...,m − 1} in repeating circles.
184 Martin Dietzfelbinger
a ... −4 −3 −2 −1 0 1 2 3 4 5 6 7 8 9 10 ...
a mod 7 ... 3 4 5 6 0123456012 3 ...
“Modular arithmetic” then means that numbers are added and multiplied
“modulo m,” which is done as follows. One adds and multiplies as usual and
then calculates the remainder of the result when divided by m. For example,
3 · (−6) mod 7 = (−18) mod 7 = 3. To make longer calculations easier, one
may replace any intermediate result by its remainder modulo m. For example,
to calculate (6 · 5+5 · 4) mod 7, one gets 6 · 5 mod 7 = 30 mod 7 = 2 in a first
step and 5 · 4 mod 7 = 20 mod 7 = 6 in a second, and obtains the final result
as (2 + 6) mod 7 = 8 mod 7 = 1.
Fingerprints
Now we apply modular arithmetic to our texts TAd and TBa. We fix some
number m. Later we will see that m should be a prime number larger than
255 and larger than n, maybe about as large as 2n or 10n. In order to keep
the numbers in the example calculation small and simple, we choose m = 17.
For r = 0, 1, 2,...,m − 1 and a text T = (a1, a2,...,an−1, an) we look at the
following number:
FPm(T,r)=(a1 · rn + a2 · rn−1 + ··· + an−1 · r2 + an · r) mod m.
Example: For TAd and r = 3 we obtain:
FPm(TAd, 3) = (65 · 38 + 100 · 37 + 101 · 36 + 108 · 35 + 97 · 34 + 105 · 33
+ 100 · 32 + 101 · 3) mod 17.
19 Fingerprinting 185
One should notice right from the start that the length n of the text may
be large, but the number of digits of m and hence the number of digits
of FPm(T,r) is really small. We call the number FPm(T,r) (you should
imagine it is written in decimal or in binary) a “fingerprint” of the text
T = (a1, a2,...,an), calculated with respect to r.
The name “fingerprint” tries to convey the idea that the number FPm(T,r)
stores in little space some information about T that makes it possible to
distinguish T from other texts, in a way similar to that in which a little
fingerprint is enough to distinguish one human being from another. Of course,
the length n of T can also be counted as a (very rudimentary) “fingerprint.”
Calculating FPm(T,r) at first glance looks like quite an adventure, in
particular for the long texts in which we are really interested, because the
high powers of r will be extremely large numbers. A simple trick, namely,
factoring out in a clever way, helps us to eliminate this problem:
FPm(T,r) = ((((···(((a1 · r) + a2) · r) + ···) · r + an−1) · r + an) · r) mod m.
If this expression is evaluated in the usual manner, starting from the inside,
working outwards, and taking remainders modulo m after each step, the intermediate results stay small. For example, we have
FPm(TAd, 3) = (((((((((65 · 3) + 100) · 3 + 101) · 3 + 108) · 3 + 97) · 3
+ 105) · 3 + 100) · 3 + 101) · 3) mod 17,
and with r = 3 the single steps are the following:
Values Intermediate result
a1 65 (65 · 3) mod 17 = (14 · 3) mod 17 = 8
a2 100 ((8 + 100) · 3) mod 17 = (6 · 3) mod 17 = 1
a3 101 ((1 + 101) · 3) mod 17 = (0 · 3) mod 17 = 0
a4 108 ((0 + 108) · 3) mod 17 = (6 · 3) mod 17 = 1
a5 97 ((1 + 97) · 3) mod 17 = (13 · 3) mod 17 = 5
a6 105 ((5 + 105) · 3) mod 17 = (8 · 3) mod 17 = 7
a7 100 ((7 + 100) · 3) mod 17 = (5 · 3) mod 17 = 15
a8 101 ((15 + 101) · 3) mod 17 = (14 · 3) mod 17 = 8
Thus, FP17(TAd, 3) = 8.
Now we can formulate the algorithm for calculating a fingerprint
FPm(T,r):
186 Martin Dietzfelbinger
Algorithm FP calculates FPm(T,r)
1 procedure FP(m, T, r)
2 begin
3 fp := (a1 · r) mod m;
4 for i from 2 to n do
5 fp := ((fp + ai) · r) mod m;
6 endfor
7 return fp
8 end
Clearly, the resulting fingerprint is a remainder modulo m and hence a
number between 0 and m −1, and the intermediate results are always smaller
than m2.
Let us use this procedure to calculate all m = 17 fingerprints for TAd and
for TBa:
r 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
FPm(TAd, r) 0 12 7 8 11 14 15 5 11 1 2 12 13 13 6 6 0
FPm(TBa, r) 0 16 9 2 2 6 14 3 11 12 2 10 11 15 2 10 11
(Alice could calculate the entries in the first row, Bob the entries in the second
row.) We compare the values for TAd and for TBa. For r = 0 we see a 0
in both rows – no surprise, since in Algorithm FP the last operation is a
multiplication by r. A fingerprint with r = 0 does not contain any information,
and we need not consider r = 0 at all. Apart from that, it is hard to spot a
pattern in the sequences of numbers in the two rows. Let us compare numbers
that appear in the same column. For r = 3 (the example from above) we
have FP17(TAd, r) = 8 and FP17(TBa, r) = 2. Note that knowing these two
fingerprints would allow Bob to decide on the spot that the texts cannot be
the same. For r = 8 and r = 10, on the other hand, the results are the same
(11 and 2, respectively) – these values of r do not help.
Fingerprints with Random Numbers
Here is the central idea that gets the approach off the ground. Why should
Alice and Bob calculate all values in the table? (Thinking of larger values
of n and m, they will not be able to do this anyway, as there is not enough
time.) However, Alice chooses a number r between 1 and m−1 at random. For
example, in order to determine the decimal digits of r, she could repeatedly
turn a “wheel of fortune” whose circumference is subdivided into ten segments
of equal length:
19 Fingerprinting 187
(In every programming language there is an operation for generating “random
numbers.” Chapter 25 deals with the question of what mechanisms are behind these “random number generators.”) Alice calls Bob and tells him which
number she has chosen. For this, she has to tell him only very few decimal
digits. Then they may hang up. Alice calculates the number FPm(TA, r) – or,
rather, lets her computer calculate this number. Simultaneously, Bob calculates FPm(TB, r). This may take a while, but no communication is necessary,
and hence there are no phone charges. As soon as both are finished, Alice calls
Bob again and tells him “her” fingerprint FPm(TA, r). Now there are several
possibilities.
Case 1: The texts TA and TB are equal. Then Alice and Bob will have
obtained the same result, no matter which r Alice had chosen.
Case 2: The texts TA and TB are different (in the example, “Adelaide” and
“Barnsley” for m = 17).
• If Alice picked a number r with FPm(TA, r) = FPm(TA, r) (in the
example, r = 8 or r = 10), then Bob will obtain the same fingerprint
as Alice, and it will look for both of them as if the texts could be equal.
• If Alice picked a number r with FPm(TA, r) = FPm(TA, r) (in the example, one of the other 14 numbers), then Bob will obtain a fingerprint
that is different from Alice’s and will be able to announce that with
certainty the texts are different.
In our simple example the chances that Alice and Bob find the difference is
14 : 16 or 87.5 percent. What are the chances in the general case for noticing
the difference? In order to be able to say something about this, we must
rummage a little more deeply in the toolbox provided by number theory, a
part of mathematics that comes in handy also when one wants to encrypt a
text (see Chap. 16). One can prove that the following is always true.
188 Martin Dietzfelbinger
Fingerprinting Theorem
If TA and TB are different texts (sequences of numbers) of length n, and if
m is a prime number larger than all numbers in TA and TB, then at most n
out of the m pairs
FPm(TA, r), FPm(TB, r), r = 0, 1,...,m − 1,
can consist of two equal numbers.
This mathematical fact has been known for centuries. Prime numbers have
lots of wonderful properties – this fact belongs to the simpler ones. How
one proves the Fingerprinting Theorem is not really important for Alice and
Bob and for our considerations here, since the proof does not figure in the
algorithm at all. We postpone a sketch of the proof to the last section of this
chapter, and first look at the way in which it helps Alice and Bob solve their
problem.
For our example with n = 8 the theorem means the following: No matter
what TA and TB look like, if they are different, then in our table there will
never be more than seven values r = 0 that make Alice and Bob calculate
the same fingerprint. This means that their chance of noticing the difference
is always 9 : 16, or more than 50 percent. But wait a second! This is not
quite true. In the example we chose for m a very small number, which is not
larger than 255 (the largest possible number that may appear in a text), as
required in the Fingerprinting Theorem. So, the conclusion that the odds of
noticing the difference between TA and TB are larger than 50 percent is only
true for pairs TA and TB that satisfy ai mod 17 = bi mod 17 for at least one
character position i. This problem disappears when m is chosen to be larger
than 255.
Now let us try our technique on the original problem with texts of length
about 50 million characters. In order to obtain something useful, Alice and
Bob must choose their prime number m somewhat larger than 50 million – let
us say they choose m = 1,037,482,333. (Such prime numbers, and much larger
ones, can be found in tables on the Internet.) For numbers n and m of that
size we definitely do not want to write down the table of all FPm(T,r) values.
But by the Fingerprinting Theorem we know that if we did, then among the
m columns there would never be more than n many in which the numbers
FPm(TA, r) and FPm(TB, r) are the same. (One of those is the column for
r = 0.)
Now, if Alice chooses r at random from the numbers between 1 and m − 1
and Alice and Bob calculate and tell each other numbers and fingerprints as
just described, then the probability that Alice happens to choose one of the
“bad” values for r and they fail to notice that TA and TB are different is at
19 Fingerprinting 189
most
n − 1
m − 1 ≈ 50000000
1000000000 = 0.05,
or 5 percent. The chance that they discover that the texts are different is at
least 95 percent!
What about communication cost? Although Alice and Bob have to calculate a lot (or have their computers compute a lot), they need to exchange
only very little information: Alice has to tell Bob her character count n (eight
decimal digits) and the prime number m (ten digits), and she has to tell him
the two numbers r and FPm(TA, r) (20 digits).
Alice and Bob can achieve an error probability of less than 5 percent
by communicating fewer than 40 decimal digits!
This means that what seemed impossible at the beginning – that one could
compare extremely long texts by some phone calls that do not last longer than
a minute – is indeed feasible.
Maybe Alice and Bob are not satisfied with an error probability of 5 percent, and insist that it must be much smaller. In this case there are improvements to the algorithm that are not really much more expensive in terms of
communicated digits. Alice chooses two numbers r1 and r2 at random and
tells Bob these two numbers and the corresponding fingerprints FPm(TA, r1)
and FPm(TA, r2). Bob declares the two texts to be equal (with a little risk of
being wrong) if he obtains the same two fingerprints for TB. The chance that
Bob declares the texts to be equal while in fact they are not is no larger than
(n − 1)2
(m − 1)2 <
 n
m
	2
≈ 0.052 = 0.0025,
the chance that the difference is noted is at least 99.75 percent. If Alice even
sends three number pairs (this means the total communication amounts to
fewer than 80 digits), the error probability drops to (n3/m3) ≈ 0.000125
or 0.0125 percent; the chance of detecting a difference increases to 99.9875
percent.
The Protocol
We summarize Alice and Bob’s method to check whether their texts are identical. As this method involves both computation and communication, one does
not call this an “algorithm” but, rather, a “protocol” (in the sense of a set of
rules that say who has to do what and when).
190 Martin Dietzfelbinger
Protocol Text Comparison by Fingerprinting
Alice has the sequence TA = (a1,...,an) of numbers between 0 and d − 1.
Bob has the sequence TB = (b1,...,bn ) of numbers between 0 and d − 1.
1. Alice tells Bob what n is. If n = n
, Bob says “different,” and STOP.
2. Alice and Bob agree on a number k of repetitions.
3. Alice finds some prime number m a little larger than d and 10n.
She chooses k numbers r1,...,rk between 1 and m − 1 at random,
and tells Bob m and r1,...,rk.
4. Alice calculates FPm(TA, r1),..., FPm(TA, rk).
(For this, she modifies algorithm FP in such a way that
the text TA is only run through once to calculate all k results.)
5. Bob calculates FPm(TB, r1),..., FPm(TB, rk) in the same way.
6. Alice tells her k results to Bob.
7. Bob compares with his k values.
If there are differences, he says “different,” and STOP.
If all values are equal, he says “can’t see a difference,” and STOP.
One can say the following about the result of the protocol.
• If Alice and Bob have the same text, then the sequences of k fingerprints
they calculate are the same. Hence the result always is “can’t see a difference.”
• If Alice and Bob have different texts (of the same length), then by the Fingerprinting Theorem, among the m − 1 numbers Alice chooses from, there
are at most n−1 many values for r that make FPm(TA, r) and FPm(TB, r)
coincide. For r randomly chosen, the probability that FPm(TA, r) and
FPm(TB, r) are equal is at most (n − 1)/(m − 1). The probability that
Alice chooses such “bad” r’s in all k trials, making Bob say “can’t see a
difference” erroneously, is no larger than
(n − 1)k
(m − 1)k =
 n − 1
m − 1
	k
<
 n
m
	k
.
Since we have assumed that m ≥ 10n, the bound is smaller than 1/10k,
and by choosing k large enough Alice and Bob can adjust the error probability
bound to as tiny a value as they wish.
If m ≈ 10n, and n has exactly l decimal digits, and Alice and Bob want the
error probability to be at most 10−k, it is sufficient that Alice communicate
(l + 1) · (2 + 2k) digits. It is astonishing that this figure changes only very
slowly when the length of the text is increased: When comparing texts that
are ten times as long, i.e., n increases by a factor of ten, the number of digits
that have to be communicated increases only by 2k.
19 Fingerprinting 191
Summary
• If one wants to have absolute certainty when comparing two texts, one
may use “lossless data compression” techniques, but normally it will not
be possible to save more than a factor of 5 or so over the full length of the
text.
• If it is acceptable that one erroneously comes to the conclusion that two
texts are the same with a (very) small probability, fingerprinting techniques
can be employed. This will dramatically reduce the length of the messages
to be transmitted.
• For texts of length n, a prime number m>n is used. When sending k
fingerprints, the error probability is no larger than ( n
m )k. In this case,
2k + k numbers not larger than m must be transmitted.
• Using randomness in algorithms and communication protocols can lead
to significant savings in resources such as storage space or transmission
time if it is acceptable that with some small probability a wrong result
occurs. More often than not, by simple means (such as repeating the algorithm/protocol) the error probability can be made so small that errors
can be practically eliminated.
• Algorithms and protocols that use randomness to make some decisions or
choices are called “randomized.” In Chap. 25 it is discussed how “randomness gets into the computer,” i.e., how one gets the computer to produce
“random” numbers.
• Sometimes very abstract mathematical facts that at first glance look nice
but do not seem to have a practical value can be utilized in order to save
computing cost, storage space, or communication cost.
Remarks on the Fingerprinting Theorem
For the mathematically interested reader, we now give an informal argument
that makes it plausible for the Fingerprinting Theorem to be true.
For this, we consider “polynomials,” more precisely “rational polynomials.”
These are expressions
f(x) = cnxn + cn−1xn−1 + ··· + c1x + c0
with a “variable” x, where the “coefficients” cn, cn−1,...,c1, c0 are rational
numbers, or fractions p/q, with p, q integers and q > 0. For example, the
following expressions are rational polynomials:
2x2 + 3
2 , 3
4x − 1
10 , x5 + 4x4 − 3x2 − 15
29x + 1
3 , 7
8 , 0.
In the second to last example ( 7
8 ) we have n = 0 and c0 = 7
8 ; in the last
example (0) there are no nonzero terms at all. When writing polynomials,
terms cixi with ci = 0 are usually omitted.
192 Martin Dietzfelbinger
Polynomials may be added and subtracted by applying the usual rules:

2x2 + 3
2

+ 
−3x2 + 3
4x − 1

= (2 − 3)x2 + 3
4x +  3
2 − 1

= −x2 + 3
4x + 1
2 , 
2x2 + 3
2

− 
−3x2 + 3
4x − 1

= (2 + 3)x2 − 3
4x +  3
2 + 1
= 5x2 − 3
4x + 5
2 .
If one subtracts a polynomial f(x) from itself, the result is the “zero polynomial”: f(x) − f(x) = 0. Of course, one may also multiply polynomials.
For this, one expands the product by the distributive law and then collects
coefficients that belong to the same power of x. Here is an example:
(2x2 + 3
2 ) · ( 3
4x3 − x) = 3
2x5 + 9
8x3 − 2x3 − 3
2x = 3
2x5 − 7
8x3 − 3
2x.
Another important operation with polynomials is “substitution”: If f(x) is a
polynomial and r is a rational number, we write f(r) for the result that is
obtained by substituting r for x in f(x) and evaluating. That means that if
f(x) = x3 − 1
2x2 + 2x − 1, then f(0) = −1 and f( 1
2 ) = 0 and f(1) = 3
2 .
A rational number r is called a root of a polynomial f(x) if f(r) = 0. For
example, r = 1
2 is a root of f(x) = x3 − 1
2x2 + 2x − 1.
Of course, the zero polynomial 0 has infinitely many roots, namely, all
rational numbers. The polynomial f(x) = 10 has no roots at all, and the
polynomial 2x + 5 has exactly one root, namely r = −5
2 . The polynomial
x2 − 1 has two roots, namely 1 and −1, and the polynomial x2 + 1 has no
(rational) roots. One can prove the following:
Theorem (Number of Roots of Rational Polynomials)
If f(x) = cnxn + cn−1xn−1 + ··· + c1x + c0 with n ≥ 0 and cn = 0 is a
polynomial, then f has at most n distinct roots.
(Roughly, the reason for this is the following: If r1,...,rk are k distinct roots
of f(x), one can write f(x) as a product (x − r1)···(x − rk) · g(x), for some
polynomial g(x) = 0. Since the highest power of x in f(x) is xn, the number
k cannot be larger than n.)
From the theorem about the roots we can conclude the following: If
g(x) = cnxn + cn−1xn−1 + ··· + c1x + c0 and
h(x) = dnxn + dn−1xn−1 + ··· + d1x + d0
are different polynomials, then there are at most n different numbers r that
satisfy g(r) = h(r). Why is that so? Consider the polynomial
f(x) = g(x) − h(x)
= (cn − dn)xn + (cn−1 − dn−1)xn−1 + ··· + (c1 − d1)x + (c0 − d0).
It could happen that cn = dn, and cn−1 = dn−1, and so on, so that many
coefficients in f(x) are 0. But since g(x) and h(x) are different, f(x) cannot
be the zero polynomial, and we can write f(x) = ekxk + ··· + e1x + e0, with
0 ≤ k ≤ n and ek = 0. By the theorem on the number of roots, we conclude
19 Fingerprinting 193
that f(x) does not have more than k ≤ n roots. But for each r we have that
if g(r) = h(r), then f(r) = g(r) − h(r) = 0, and hence r is a root of f(x).
Hence, there cannot be more than n numbers r with g(r) = h(r).
Hey – this is almost the formulation of the Fingerprinting Theorem! The
only difference is that in the Fingerprinting Theorem we are talking about
calculations modulo some prime number m, and here we consider calculations
with rational numbers. However, for the theorem about the number of roots
of a polynomial to be true we do not really need the rational numbers, but
only a domain of numbers in which we can add, subtract, multiply, and divide
(by any element that is not zero). One can show that arithmetic modulo m
has this property if and only if m is a prime number. This means that the
theorem about the number of roots holds in modular arithmetic modulo a
prime m as well.
Further Reading
1. J. Hromkoviˇc: Design and Analysis of Randomized Algorithms. Springer,
Berlin, 2005.
This book describes many randomized algorithms, protocols, and methods
as well as the fundamentals of the design and the study of such methods.
2. For readers who want to know all the details, a complete proof of the
Fingerprinting Theorem from first principles can be found on the page
http://eiche.theoinf.tu-ilmenau.de/fingerprint/
3. A complete description of the ASCII code, and much more information
about it, can be found at http://en.wikipedia.org/wiki/ASCII
4. A list of prime numbers with size about 2k, 1 ≤ k ≤ 400: http://primes.
utm.edu/lists/2small/0bit.html
Acknowledgement
Many thanks to J.D. for help with the illustrations.

`
let Change_in_text1 = `
19
Fingerprinting
Martin Dietzfelbinger
Technische Universit¨at Ilmenau, Ilmenau, Germany
How to Compare Long Texts over the Telephon2
Alice and Bob are very good friends. Alice rives in Adelaide in Australia,
and Bob lives in Barnsley in (Great) Britaig. They love to talk to each other
on their cellphones, but this can cost quate some money when they talk for
long. The two of them share many interesth, and they are interested in lots
of things. So it comes as no surprise thav they both buy an encyclopedia.
They tell each other about their acquisitbon on the phone. What a surprise
– they both bought the same encyclopedia!  n the phone, Alice asks Bob
a simple question: Do both copies contain exactly the same text? Are they
really identical, word by word, comma by comma?
Even if Alice and Bob figure out that both have bought the 37th edition
of the encyclopedia, say, this does not necessarily mean that the copy that
was printed in Australia contains exactly the same text as the one that was
printed in England. Maybe some misprints were corrected? How can they
find out whether both copies are really identical? Alice could read her copy
to Bob, on the phone. Bob would read along and compare each word and
each punctuation mark. This would do the job, but it would cost a hell
of a lot in telephone charges (at least if the two use their cellphones), because Alice and Bob have chosen quite a voluminous encyclopedia: 12 volumes, about 1,500 pages per volume, about 2,800 characters per page; all in
B. V¨ocking et al. (eds.), Algorithms Unplugged,
DOI 10.1007/978-3-642-15328-0 19, c Springer-Verlag Berlin Heidelberg 2011
182 Martin Dietzfelbinger
all about 18,000 pages and about 50 million characters. If Alice needs only
five minutes to read one page, and they work on it without any breaks, the
two of them and the phone tariff unit counter will be busy for more than
60 days.
In a computer, we may represent a character, including commas, spaces,
and line and page breaks, by a binary code, e.g., with eight bits (one byte) per
character. For the whole encyclopedia this will amount to 50 million bytes,
or about 50 Megabytes. Let us assume that Alice and Bob have individually
managed to enter the text of their respective copies into a computer. As soon
as the encyclopedia is stored electronically, it is actually no big deal to send
this amount of data from Australia to England by e-mail. For the sake of
argument, let us assume however that the connection is either very expensive
or very error-prone, so that the transmission of such a large amount of data
via e-mail is impossible or undesirable.
Is there a way for Alice and Bob to find out whether the two texts are
identical without comparing them character by character? They would prefer
to carry out any conversation needed by cellphone, and hence keep the amount
of information that has to be exchanged very small.
If you sometimes send large files via e-mail or if you ever found it necessary
to make room on your brimful hard disk, you know that there are methods
that do something called “data compression.” By such methods, one “squeezes
together” data such as texts or images, so that they take up less space and
transmission times are shorter. Alice and Bob could use such methods. But
even if they manage to achieve a compression to, say, a fifth of the original
length of their data, it would still take too long to carry out the communication. So, data compression does not solve the problem.
Here is a very simple observation: Alice should start by counting the characters in her encyclopedia. Let us denote the result by n. Alice tells Bob what
n is, which means reading out eight decimal digits, which is a matter of seconds. Bob also has counted the characters in his copy, with a result of n
.
If n and n are different, Bob can announce that the texts are different. (We
assume that Alice and Bob haven’t miscounted.) From now on we may assume
the texts of Alice and Bob have exactly the same length.
Texts as Sequences of Numbers and Modular Arithmetic
Our long-term goal is to find a trick that makes it possible to solve the text
comparison problem with very short messages. For this, we want to translate
texts into numbers and then calculate with these numbers. A little basic work
is needed for this. We already noted that in a computer each character is
represented by a sequence of eight bits, that is, a byte. A standard way of
doing this is given by the ASCII code. In this code, the characters A, B, C,...
look like this: 01000001, 01000010, 01000011, etc. These bit patterns can also
19 Fingerprinting 183
be regarded as binary representations of numbers. In this way, we reach the
following way of coding characters by numbers:
ABC ··· Zabc ··· z
65 66 67 ··· 90 97 98 99 ··· 122
The punctuation marks are assigned numbers as well: for example, the exclamation mark (“!”) has number 33 and the space (“ ”) has number 32. In this
way, every character is represented by a number between 0 and 255. The text
Alice and Bob have a chat.
including spaces and the period translates into
65 108 105 99 101 32 97 110 100 32 66 111 98 32
104 97 118 101 32 97 32 99 104 97 116 46,
which we write “mathematically” as a sequence
(65, 108, 105, 99, 101, 32, 97, 110, 100, 32, 66, 111, 98, 32,
104, 97, 118, 101, 32, 97, 32, 99, 104, 97, 116, 46).
Now we can imagine that Alice has translated her whole encyclopedia into
one long sequence
TA = (a1, a2,...,an−1, an)
of numbers between 0 and 255, and that Bob has done the same with his copy:
TB = (b1, b2,...,bn−1, bn).
Here n is about 50 million, and you see that it is impossible to write down
sequences as long as that in this little book. As a manageable example we
take two sequences of length n = 8:
Texts (“Adelaide” and “Barnsley”) as sequences of numbers
TAd = (a1, a2,...,a8) = (65, 100, 101, 108, 97, 105, 100, 101)
TBa = (b1, b2,...,b8) = (66, 97, 114, 110, 115, 108, 101, 121)
Now we want to calculate with these number sequences. For this we need
a method that has been mentioned already in Chap. 17 and will be explained
in more detail in Chap. 25: “modular arithmetic.” Taking an arbitrary integer
a modulo an integer m > 1 simply means that one calculates the remainder
when a is divided by m; in other words, one counts how many steps one
has to walk to the left on the number line, starting at a, until one hits a
multiple of m. We write a mod m for this number. For example, if m = 7,
then 16 mod 7 = 2 and −4 mod 7 = 3. In the following table you find some
more values of a mod 7. You will spot the pattern at once: if you walk along
the number line to the right, the values of the remainders a mod m run around
{0, 1,...,m − 1} in repeating circles.
184 Martin Dietzfelbinger
a ... −4 −3 −2 −1 0 1 2 3 4 5 6 7 8 9 10 ...
a mod 7 ... 3 4 5 6 0123456012 3 ...
“Modular arithmetic” then means that numbers are added and multiplied
“modulo m,” which is done as follows. One adds and multiplies as usual and
then calculates the remainder of the result when divided by m. For example,
3 · (−6) mod 7 = (−18) mod 7 = 3. To make longer calculations easier, one
may replace any intermediate result by its remainder modulo m. For example,
to calculate (6 · 5+5 · 4) mod 7, one gets 6 · 5 mod 7 = 30 mod 7 = 2 in a first
step and 5 · 4 mod 7 = 20 mod 7 = 6 in a second, and obtains the final result
as (2 + 6) mod 7 = 8 mod 7 = 1.
Fingerprints
Now we apply modular arithmetic to our texts TAd and TBa. We fix some
number m. Later we will see that m should be a prime number larger than
255 and larger than n, maybe about as large as 2n or 10n. In order to keep
the numbers in the example calculation small and simple, we choose m = 17.
For r = 0, 1, 2,...,m − 1 and a text T = (a1, a2,...,an−1, an) we look at the
following number:
FPm(T,r)=(a1 · rn + a2 · rn−1 + ··· + an−1 · r2 + an · r) mod m.
Example: For TAd and r = 3 we obtain:
FPm(TAd, 3) = (65 · 38 + 100 · 37 + 101 · 36 + 108 · 35 + 97 · 34 + 105 · 33
+ 100 · 32 + 101 · 3) mod 17.
19 Fingerprinting 185
One should notice right from the start that the length n of the text may
be large, but the number of digits of m and hence the number of digits
of FPm(T,r) is really small. We call the number FPm(T,r) (you should
imagine it is written in decimal or in binary) a “fingerprint” of the text
T = (a1, a2,...,an), calculated with respect to r.
The name “fingerprint” tries to convey the idea that the number FPm(T,r)
stores in little space some information about T that makes it possible to
distinguish T from other texts, in a way similar to that in which a little
fingerprint is enough to distinguish one human being from another. Of course,
the length n of T can also be counted as a (very rudimentary) “fingerprint.”
Calculating FPm(T,r) at first glance looks like quite an adventure, in
particular for the long texts in which we are really interested, because the
high powers of r will be extremely large numbers. A simple trick, namely,
factoring out in a clever way, helps us to eliminate this problem:
FPm(T,r) = ((((···(((a1 · r) + a2) · r) + ···) · r + an−1) · r + an) · r) mod m.
If this expression is evaluated in the usual manner, starting from the inside,
working outwards, and taking remainders modulo m after each step, the intermediate results stay small. For example, we have
FPm(TAd, 3) = (((((((((65 · 3) + 100) · 3 + 101) · 3 + 108) · 3 + 97) · 3
+ 105) · 3 + 100) · 3 + 101) · 3) mod 17,
and with r = 3 the single steps are the following:
Values Intermediate result
a1 65 (65 · 3) mod 17 = (14 · 3) mod 17 = 8
a2 100 ((8 + 100) · 3) mod 17 = (6 · 3) mod 17 = 1
a3 101 ((1 + 101) · 3) mod 17 = (0 · 3) mod 17 = 0
a4 108 ((0 + 108) · 3) mod 17 = (6 · 3) mod 17 = 1
a5 97 ((1 + 97) · 3) mod 17 = (13 · 3) mod 17 = 5
a6 105 ((5 + 105) · 3) mod 17 = (8 · 3) mod 17 = 7
a7 100 ((7 + 100) · 3) mod 17 = (5 · 3) mod 17 = 15
a8 101 ((15 + 101) · 3) mod 17 = (14 · 3) mod 17 = 8
Thus, FP17(TAd, 3) = 8.
Now we can formulate the algorithm for calculating a fingerprint
FPm(T,r):
186 Martin Dietzfelbinger
Algorithm FP calculates FPm(T,r)
1 procedure FP(m, T, r)
2 begin
3 fp := (a1 · r) mod m;
4 for i from 2 to n do
5 fp := ((fp + ai) · r) mod m;
6 endfor
7 return fp
8 end
Clearly, the resulting fingerprint is a remainder modulo m and hence a
number between 0 and m −1, and the intermediate results are always smaller
than m2.
Let us use this procedure to calculate all m = 17 fingerprints for TAd and
for TBa:
r 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
FPm(TAd, r) 0 12 7 8 11 14 15 5 11 1 2 12 13 13 6 6 0
FPm(TBa, r) 0 16 9 2 2 6 14 3 11 12 2 10 11 15 2 10 11
(Alice could calculate the entries in the first row, Bob the entries in the second
row.) We compare the values for TAd and for TBa. For r = 0 we see a 0
in both rows – no surprise, since in Algorithm FP the last operation is a
multiplication by r. A fingerprint with r = 0 does not contain any information,
and we need not consider r = 0 at all. Apart from that, it is hard to spot a
pattern in the sequences of numbers in the two rows. Let us compare numbers
that appear in the same column. For r = 3 (the example from above) we
have FP17(TAd, r) = 8 and FP17(TBa, r) = 2. Note that knowing these two
fingerprints would allow Bob to decide on the spot that the texts cannot be
the same. For r = 8 and r = 10, on the other hand, the results are the same
(11 and 2, respectively) – these values of r do not help.
Fingerprints with Random Numbers
Here is the central idea that gets the approach off the ground. Why should
Alice and Bob calculate all values in the table? (Thinking of larger values
of n and m, they will not be able to do this anyway, as there is not enough
time.) However, Alice chooses a number r between 1 and m−1 at random. For
example, in order to determine the decimal digits of r, she could repeatedly
turn a “wheel of fortune” whose circumference is subdivided into ten segments
of equal length:
19 Fingerprinting 187
(In every programming language there is an operation for generating “random
numbers.” Chapter 25 deals with the question of what mechanisms are behind these “random number generators.”) Alice calls Bob and tells him which
number she has chosen. For this, she has to tell him only very few decimal
digits. Then they may hang up. Alice calculates the number FPm(TA, r) – or,
rather, lets her computer calculate this number. Simultaneously, Bob calculates FPm(TB, r). This may take a while, but no communication is necessary,
and hence there are no phone charges. As soon as both are finished, Alice calls
Bob again and tells him “her” fingerprint FPm(TA, r). Now there are several
possibilities.
Case 1: The texts TA and TB are equal. Then Alice and Bob will have
obtained the same result, no matter which r Alice had chosen.
Case 2: The texts TA and TB are different (in the example, “Adelaide” and
“Barnsley” for m = 17).
• If Alice picked a number r with FPm(TA, r) = FPm(TA, r) (in the
example, r = 8 or r = 10), then Bob will obtain the same fingerprint
as Alice, and it will look for both of them as if the texts could be equal.
• If Alice picked a number r with FPm(TA, r) = FPm(TA, r) (in the example, one of the other 14 numbers), then Bob will obtain a fingerprint
that is different from Alice’s and will be able to announce that with
certainty the texts are different.
In our simple example the chances that Alice and Bob find the difference is
14 : 16 or 87.5 percent. What are the chances in the general case for noticing
the difference? In order to be able to say something about this, we must
rummage a little more deeply in the toolbox provided by number theory, a
part of mathematics that comes in handy also when one wants to encrypt a
text (see Chap. 16). One can prove that the following is always true.
188 Martin Dietzfelbinger
Fingerprinting Theorem
If TA and TB are different texts (sequences of numbers) of length n, and if
m is a prime number larger than all numbers in TA and TB, then at most n
out of the m pairs
FPm(TA, r), FPm(TB, r), r = 0, 1,...,m − 1,
can consist of two equal numbers.
This mathematical fact has been known for centuries. Prime numbers have
lots of wonderful properties – this fact belongs to the simpler ones. How
one proves the Fingerprinting Theorem is not really important for Alice and
Bob and for our considerations here, since the proof does not figure in the
algorithm at all. We postpone a sketch of the proof to the last section of this
chapter, and first look at the way in which it helps Alice and Bob solve their
problem.
For our example with n = 8 the theorem means the following: No matter
what TA and TB look like, if they are different, then in our table there will
never be more than seven values r = 0 that make Alice and Bob calculate
the same fingerprint. This means that their chance of noticing the difference
is always 9 : 16, or more than 50 percent. But wait a second! This is not
quite true. In the example we chose for m a very small number, which is not
larger than 255 (the largest possible number that may appear in a text), as
required in the Fingerprinting Theorem. So, the conclusion that the odds of
noticing the difference between TA and TB are larger than 50 percent is only
true for pairs TA and TB that satisfy ai mod 17 = bi mod 17 for at least one
character position i. This problem disappears when m is chosen to be larger
than 255.
Now let us try our technique on the original problem with texts of length
about 50 million characters. In order to obtain something useful, Alice and
Bob must choose their prime number m somewhat larger than 50 million – let
us say they choose m = 1,037,482,333. (Such prime numbers, and much larger
ones, can be found in tables on the Internet.) For numbers n and m of that
size we definitely do not want to write down the table of all FPm(T,r) values.
But by the Fingerprinting Theorem we know that if we did, then among the
m columns there would never be more than n many in which the numbers
FPm(TA, r) and FPm(TB, r) are the same. (One of those is the column for
r = 0.)
Now, if Alice chooses r at random from the numbers between 1 and m − 1
and Alice and Bob calculate and tell each other numbers and fingerprints as
just described, then the probability that Alice happens to choose one of the
“bad” values for r and they fail to notice that TA and TB are different is at
19 Fingerprinting 189
most
n − 1
m − 1 ≈ 50000000
1000000000 = 0.05,
or 5 percent. The chance that they discover that the texts are different is at
least 95 percent!
What about communication cost? Although Alice and Bob have to calculate a lot (or have their computers compute a lot), they need to exchange
only very little information: Alice has to tell Bob her character count n (eight
decimal digits) and the prime number m (ten digits), and she has to tell him
the two numbers r and FPm(TA, r) (20 digits).
Alice and Bob can achieve an error probability of less than 5 percent
by communicating fewer than 40 decimal digits!
This means that what seemed impossible at the beginning – that one could
compare extremely long texts by some phone calls that do not last longer than
a minute – is indeed feasible.
Maybe Alice and Bob are not satisfied with an error probability of 5 percent, and insist that it must be much smaller. In this case there are improvements to the algorithm that are not really much more expensive in terms of
communicated digits. Alice chooses two numbers r1 and r2 at random and
tells Bob these two numbers and the corresponding fingerprints FPm(TA, r1)
and FPm(TA, r2). Bob declares the two texts to be equal (with a little risk of
being wrong) if he obtains the same two fingerprints for TB. The chance that
Bob declares the texts to be equal while in fact they are not is no larger than
(n − 1)2
(m − 1)2 <
 n
m
	2
≈ 0.052 = 0.0025,
the chance that the difference is noted is at least 99.75 percent. If Alice even
sends three number pairs (this means the total communication amounts to
fewer than 80 digits), the error probability drops to (n3/m3) ≈ 0.000125
or 0.0125 percent; the chance of detecting a difference increases to 99.9875
percent.
The Protocol
We summarize Alice and Bob’s method to check whether their texts are identical. As this method involves both computation and communication, one does
not call this an “algorithm” but, rather, a “protocol” (in the sense of a set of
rules that say who has to do what and when).
190 Martin Dietzfelbinger
Protocol Text Comparison by Fingerprinting
Alice has the sequence TA = (a1,...,an) of numbers between 0 and d − 1.
Bob has the sequence TB = (b1,...,bn ) of numbers between 0 and d − 1.
1. Alice tells Bob what n is. If n = n
, Bob says “different,” and STOP.
2. Alice and Bob agree on a number k of repetitions.
3. Alice finds some prime number m a little larger than d and 10n.
She chooses k numbers r1,...,rk between 1 and m − 1 at random,
and tells Bob m and r1,...,rk.
4. Alice calculates FPm(TA, r1),..., FPm(TA, rk).
(For this, she modifies algorithm FP in such a way that
the text TA is only run through once to calculate all k results.)
5. Bob calculates FPm(TB, r1),..., FPm(TB, rk) in the same way.
6. Alice tells her k results to Bob.
7. Bob compares with his k values.
If there are differences, he says “different,” and STOP.
If all values are equal, he says “can’t see a difference,” and STOP.
One can say the following about the result of the protocol.
• If Alice and Bob have the same text, then the sequences of k fingerprints
they calculate are the same. Hence the result always is “can’t see a difference.”
• If Alice and Bob have different texts (of the same length), then by the Fingerprinting Theorem, among the m − 1 numbers Alice chooses from, there
are at most n−1 many values for r that make FPm(TA, r) and FPm(TB, r)
coincide. For r randomly chosen, the probability that FPm(TA, r) and
FPm(TB, r) are equal is at most (n − 1)/(m − 1). The probability that
Alice chooses such “bad” r’s in all k trials, making Bob say “can’t see a
difference” erroneously, is no larger than
(n − 1)k
(m − 1)k =
 n − 1
m − 1
	k
<
 n
m
	k
.
Since we have assumed that m ≥ 10n, the bound is smaller than 1/10k,
and by choosing k large enough Alice and Bob can adjust the error probability
bound to as tiny a value as they wish.
If m ≈ 10n, and n has exactly l decimal digits, and Alice and Bob want the
error probability to be at most 10−k, it is sufficient that Alice communicate
(l + 1) · (2 + 2k) digits. It is astonishing that this figure changes only very
slowly when the length of the text is increased: When comparing texts that
are ten times as long, i.e., n increases by a factor of ten, the number of digits
that have to be communicated increases only by 2k.
19 Fingerprinting 191
Summary
• If one wants to have absolute certainty when comparing two texts, one
may use “lossless data compression” techniques, but normally it will not
be possible to save more than a factor of 5 or so over the full length of the
text.
• If it is acceptable that one erroneously comes to the conclusion that two
texts are the same with a (very) small probability, fingerprinting techniques
can be employed. This will dramatically reduce the length of the messages
to be transmitted.
• For texts of length n, a prime number m>n is used. When sending k
fingerprints, the error probability is no larger than ( n
m )k. In this case,
2k + k numbers not larger than m must be transmitted.
• Using randomness in algorithms and communication protocols can lead
to significant savings in resources such as storage space or transmission
time if it is acceptable that with some small probability a wrong result
occurs. More often than not, by simple means (such as repeating the algorithm/protocol) the error probability can be made so small that errors
can be practically eliminated.
• Algorithms and protocols that use randomness to make some decisions or
choices are called “randomized.” In Chap. 25 it is discussed how “randomness gets into the computer,” i.e., how one gets the computer to produce
“random” numbers.
• Sometimes very abstract mathematical facts that at first glance look nice
but do not seem to have a practical value can be utilized in order to save
computing cost, storage space, or communication cost.
Remarks on the Fingerprinting Theorem
For the mathematically interested reader, we now give an informal argument
that makes it plausible for the Fingerprinting Theorem to be true.
For this, we consider “polynomials,” more precisely “rational polynomials.”
These are expressions
f(x) = cnxn + cn−1xn−1 + ··· + c1x + c0
with a “variable” x, where the “coefficients” cn, cn−1,...,c1, c0 are rational
numbers, or fractions p/q, with p, q integers and q > 0. For example, the
following expressions are rational polynomials:
2x2 + 3
2 , 3
4x − 1
10 , x5 + 4x4 − 3x2 − 15
29x + 1
3 , 7
8 , 0.
In the second to last example ( 7
8 ) we have n = 0 and c0 = 7
8 ; in the last
example (0) there are no nonzero terms at all. When writing polynomials,
terms cixi with ci = 0 are usually omitted.
192 Martin Dietzfelbinger
Polynomials may be added and subtracted by applying the usual rules:

2x2 + 3
2

+ 
−3x2 + 3
4x − 1

= (2 − 3)x2 + 3
4x +  3
2 − 1

= −x2 + 3
4x + 1
2 , 
2x2 + 3
2

− 
−3x2 + 3
4x − 1

= (2 + 3)x2 − 3
4x +  3
2 + 1
= 5x2 − 3
4x + 5
2 .
If one subtracts a polynomial f(x) from itself, the result is the “zero polynomial”: f(x) − f(x) = 0. Of course, one may also multiply polynomials.
For this, one expands the product by the distributive law and then collects
coefficients that belong to the same power of x. Here is an example:
(2x2 + 3
2 ) · ( 3
4x3 − x) = 3
2x5 + 9
8x3 − 2x3 − 3
2x = 3
2x5 − 7
8x3 − 3
2x.
Another important operation with polynomials is “substitution”: If f(x) is a
polynomial and r is a rational number, we write f(r) for the result that is
obtained by substituting r for x in f(x) and evaluating. That means that if
f(x) = x3 − 1
2x2 + 2x − 1, then f(0) = −1 and f( 1
2 ) = 0 and f(1) = 3
2 .
A rational number r is called a root of a polynomial f(x) if f(r) = 0. For
example, r = 1
2 is a root of f(x) = x3 − 1
2x2 + 2x − 1.
Of course, the zero polynomial 0 has infinitely many roots, namely, all
rational numbers. The polynomial f(x) = 10 has no roots at all, and the
polynomial 2x + 5 has exactly one root, namely r = −5
2 . The polynomial
x2 − 1 has two roots, namely 1 and −1, and the polynomial x2 + 1 has no
(rational) roots. One can prove the following:
Theorem (Number of Roots of Rational Polynomials)
If f(x) = cnxn + cn−1xn−1 + ··· + c1x + c0 with n ≥ 0 and cn = 0 is a
polynomial, then f has at most n distinct roots.
(Roughly, the reason for this is the following: If r1,...,rk are k distinct roots
of f(x), one can write f(x) as a product (x − r1)···(x − rk) · g(x), for some
polynomial g(x) = 0. Since the highest power of x in f(x) is xn, the number
k cannot be larger than n.)
From the theorem about the roots we can conclude the following: If
g(x) = cnxn + cn−1xn−1 + ··· + c1x + c0 and
h(x) = dnxn + dn−1xn−1 + ··· + d1x + d0
are different polynomials, then there are at most n different numbers r that
satisfy g(r) = h(r). Why is that so? Consider the polynomial
f(x) = g(x) − h(x)
= (cn − dn)xn + (cn−1 − dn−1)xn−1 + ··· + (c1 − d1)x + (c0 − d0).
It could happen that cn = dn, and cn−1 = dn−1, and so on, so that many
coefficients in f(x) are 0. But since g(x) and h(x) are different, f(x) cannot
be the zero polynomial, and we can write f(x) = ekxk + ··· + e1x + e0, with
0 ≤ k ≤ n and ek = 0. By the theorem on the number of roots, we conclude
19 Fingerprinting 193
that f(x) does not have more than k ≤ n roots. But for each r we have that
if g(r) = h(r), then f(r) = g(r) − h(r) = 0, and hence r is a root of f(x).
Hence, there cannot be more than n numbers r with g(r) = h(r).
Hey – this is almost the formulation of the Fingerprinting Theorem! The
only difference is that in the Fingerprinting Theorem we are talking about
calculations modulo some prime number m, and here we consider calculations
with rational numbers. However, for the theorem about the number of roots
of a polynomial to be true we do not really need the rational numbers, but
only a domain of numbers in which we can add, subtract, multiply, and divide
(by any element that is not zero). One can show that arithmetic modulo m
has this property if and only if m is a prime number. This means that the
theorem about the number of roots holds in modular arithmetic modulo a
prime m as well.
Further Reading
1. J. Hromkoviˇc: Design and Analysis of Randomized Algorithms. Springer,
Berlin, 2005.
This book describes many randomized algorithms, protocols, and methods
as well as the fundamentals of the design and the study of such methods.
2. For readers who want to know all the details, a complete proof of the
Fingerprinting Theorem from first principles can be found on the page
http://eiche.theoinf.tu-ilmenau.de/fingerprint/
3. A complete description of the ASCII code, and much more information
about it, can be found at http://en.wikipedia.org/wiki/ASCII
4. A list of prime numbers with size about 2k, 1 ≤ k ≤ 400: http://primes.
utm.edu/lists/2small/0bit.html
Acknowledgement
Many thanks to J.D. for help with the illustrations.

`
module.exports ={text1 , Change_in_text1}