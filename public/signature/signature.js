const LOGO_B64 = "iVBORw0KGgoAAAANSUhEUgAAAIsAAAAwCAIAAACudh4eAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAX0klEQVR4nO18a5Bd1ZXet/Y+r/vqvv1SSy0L8RAg0RIY0AiEsGywwYORJ8GxRJXKQwkXNrYTKziVZKxUUonKZYeZceEkY2ymYotyyh7sMNhjMGPAAWQNCAn0QhIPCYmHXt2tVnffvo/z3Huv/Nj33u4W8INMjaFCr7p1u/v0Ofvss769vr322msdYmZYaf0EgQE99ReEUWQMMg2lEUWoNzA5ickaTo5geCQZPlOvVrIoAZArFfzOzmDReZjbi7l9KOVRKKAUmEJghOfAAQRm5b0IzUDI/irAgAEYBjAOGEmGOMFkhLExc+zEW0eOvH7oUHjiZMfIeNBIYNhxHOEIQ5Ceh3wuckQUOGlXqXj+wnOWX7HgimU0pxdCQOYA521dmPEXv+t/PqQyDSEDaCBl5AgCDBMldd+X0igMj+H4CPYcPrn9+SMvv6yzKNdR8By3t7O3VCp19fdRbzeKefguXA+uB9eF66FYMkn08shJXcgvXHZJ+ZwFcAM4LkiCWlBQy6gIgB0Zpg2ShJgFaaYNxYALSDA4bFQK+UCdPOlUazgx/NxPfl556XCfdEvCuXjZEixdgkaIoAitAQ2dVmuViVoV0ikWOrq7eymfR2cXunvQkYdD6CxhYB5cH56EkBACaNIpm5k4kLEWDEDMIjQdIauXKE4KgU9Q4AxvDeF0ffTBR/Y9+aTr0EV/NDhw2SDgIEowMlJ76ZWxM2fqjcZkEhqC8FxyJDORYWZSRpDvmVy+9JF5l1670l1+Bbo60F1GuZOlTGBSQMAlgFjnyYFpwYLm1AfC7KSF6QhpIEbqQMgsczKF0TGcPL39+/fLU6NXXXklLjwPeYPhUxPH3zr60kujx091Fwol1+/v6+nu6yXPgXThehASGcPxIF3U63AlF/OHho6NxI2eSwcX3XQzDfR7vd3G82OQhiCAYApwyHIst3hPGgZoFqGZCJkUmk2cVxLVyGzb9fO/+sGypUuWfeo6JCm0wbbndr2wQxW8fE9p7ty5cy4dRKaQJWiEqNZQqaERIWEYIDMgoKMTPWWUi+jvRV8Zjnvg6JvzL7us+6OD6O7IhIkIgjwH0gfIAKZJfZBIAQYcQL6fyvlAyAyENLQH1Th6whsaf/Sev/7nX/86XKB6BpWJn993X0+CG27+DAb6UfDg+zh+/PQrr7xx5Ojw8CnXdfO5nI5TEysPwoPwvZxmo6VosBltVOdftOhja9Zg3rnoLGNOB3pK6Mxz4KUQDHIgJEAthJiQzSLUkunzkGlE1aLv49iZ/b994tLlV8EwMvXK3z968I1DN3/u5vzC+ag2kAkcOrpn6zPjI2dKpU6Z88vz++dcsNDrK2cSSlIQBCLTupEGLBClE0NnauOV0aHht4682VfqOn/p4ILrV+KKQcwtw+U4kAYegwjCszi1esaz3jaAGb4cDLRCmr7+7M7zL14CCITRi796+PxzFpQuuRAus8jePPTaoa073Wq87NxFcwYWoH8eyp0oFeACgURHDsRIQkgfSgMuIoVahEQhyTBZxZE3Xjt6+PXJsc6Lzl1y/bWdlw6ilEtUJr0AEICgab7BLDxWZnrbSQJHQitkKVL921/84qZPfQqFIoTE6PDeXbsmJyc/cd11CHKINXp7kc9DCkgJSSA0P2AYmvrWBkpDa5gMaYyhkyiWxk+ceuKpp29Ze6s/bx6CHAIfQkAISDBBAxogwP0g4TRtKJ8tRP+E3ZyJkAHIKKOUTgPHrw+NFOf0Ic2ikyd96QgISIF5c5CmMIxCAUQsZbOLPC0eYAxspwWDYMAaLKBVbdzPF1CLUI/g5RFlL+9+8ZJP3wgSkICcQshYh+6DhND7JTPWQ5lhJoDIZKlHkOSANZQGEccx5fMgggQUQ0gIKOL2sqW5/reNsW2HddOFNhogsISS0CIzQrpIDSBVveGUuyAAIRSANip2bUT/H0LEzO/J5mYgpAHVCpwZw1JQHIWFXAAgS1MhhJQegxnEhDhLXNe1PjJBEJhYAGACgWxYz34zALBpEp/x4DiAihInCAARpan0A9OyG8d2wAZuxfuDUFsnZ6ny3YjuD8VyABhaAYBwkQAZDAAJIVn7JGEYbLkLMQGAD0VgcHOdyQCT0GgiJGAAFjCCGbA+tGAIAlwIYiRp4rh+ylpIqVvm58DIKX57f1as73WY/5PKNBUwoCAJZDhNMgI0KwmhOXNIAoBiZBqqee40BrJDXRIkgUSL9whCQgqWYAEtSDseHJ1quzJNU8NwIOBKKVum4wDUDOEaDcNTgaA/qHxw4ME77z60dK8zJR0HbMAEIs4y8lwb7kwSraF937KcIEt8LWEDiKav0GzWMp1i8giANpASTIgamee5jmzdF+3IqUEzcvo+mJExxoL0j2Q5rfX0dv7fgH8nliMICWIGM7IM0oaiBYghqB4nQeBLwBgoYsAQC8EQTASQAADDIGpeAVijYBiGFDrTTARHKGN8X6Sx8X3R8i9sjwyEbQNG83siOinfOQShtX7H4+8m0+eh6co15r3ZtG2n3UK7tXfrzzv3n6eJYY5iZZgN8+FXD3mudICv3HG7ihvMOsniE8NDXQPzIJ2gu/c//9c/v+2OO0BCSPe/bP5Wmqo4yd46eeqe738fvkeF/MLFF3/tro2//LtfzZ3T75P0ABeU99ymqUjhBP7/vH+LYjbMSZYyc6NWZ8M6SdnoLI23bdtWLpen9zsIgvaT3HnnnadOnbLHP/3pT6dpap8iiqLLL78cQLlcnpycPHr06DXXXDNdBVLKdptLly49ffq0lNJxHNd1ATiOY7/b5/zkJz+pVCqbN2+2d/c8D9MMwnXdvr6+SqVSKpV837cHbSO2BcdxiGju3LljY2PM/Nxzzw0ODravtSfkcjkAQojVq1fbp4jjmJmVUjN2POvVqFTKJbH2A1lrVNNMg3DB4ouk76VZ/PgT/2f9n34hjtSc/v59Lx548sknN2/aBKI7v/zlb9y18Rv/+q5f/fqXp4ZOAfjS1776H/7Tf+zo6Fhx5fIf3fdD1mbFiiuXDS51PTk+MdE/MA+CRs+cue32DR//+PUMk8FIRxpwvlgwSgvHAehHf/2jf/dnf1YPG4ODg6tXr7bM02g0urq66vX61VdfvW7dunK5LIRYtGjRI4884rpulmWu627YsGHv3r0A7rnnnuPHjy9fvjyO40KhcMcdd8RxTETGGKVUqVQqFot33XXXQw89dPvtt+fzeWPMfffdp5QC8MUvfpGIlFLr1q1buHBhT0+PNYj169d7nlcsFuM4zuVyYRgKIb7zne/cfffdjUbDGhkR+b6vlLK2QkRSyuHh4bvvvrujo2Pz5s1CiFKptHbtWgtPHMe+75fL5Wq1et9999VqNdd1gyDQWkspMcOCNLPSbDiOGs88s81xAcL/fvBvkrTxjX/z9cCXEvi3GzfWR8fffOk1F7Lc0Qlg9bUfy3tuDvKWP77poZ/+jLOMjWbW3/rWZgBC4Hv3fDeJQzaatWats0aDjWajoqhhrccwpypLVVat12xP/uq//w/PcQGsXbt2586dBw8e3LVr1+7du1966aUXX3yRmRuNxo033mgH1ne/+93HHnvs+eef3759+7e//W3f94UQ69evP3nypB3Uy5cv37t3744dO1544YV9+/bt2rVr//791Wp1On9Uq9UvfOELUkrXdY8ePdpoNOzxLMusReZyuYcffnjfvn379+8/ePDgzp07Jycn7Tm/+c1vrEHcdtttWZbdeeed1oYOHDgQhuG5554L4Pzzz9+3b9+CBQsA9Pf379ixY9euXQcOHHjxxRd37tz56quvxnFsacBaT61Ws42fhZBOJ6tWxX/5F9+xLsMjj/7dZ9bcFOScYsF/8IGfstK6Vv/kVSs9G5hxZV9v99e+/KV4osJKc6Y4SU0c73jmHywL3HrrWqVSZp1lCWeZiWPWrKOIDbNhnSlry/b+7c81165qe4qe5wkhLBHZIXngwIEzZ85Ypdjx2OYcy05r1qxRSq1fv75NOPaEYrHYbnPTpk3WmCzejz/+uO/7nud985vftPBEUcTMt9xyi4Wn/W2bWrlypT2tUqmcd955ts1KpbJ161bLxvfffz8zb9q0qbOzU0q5ZcuWJUuWnEXXluWEEL7vf+UrX2nf1CJkjJmJEGs2GetMxw3W6aZv/nvPc0CAS36p4OS9I28djVQcp407vrQBhFze/cxNN3SVOwj4+r/6mtFZFDWYdabTMIv8YhCUcrmOfDVsKGbFrNlwplgzJ5o1h5U6G07DJlRRI4yiyDCHcRSrzF5imNM0TZKkXq8PDQ3Zp1q2bJnVaRzH1Wr18OHDAHzf37JlS5Zl1Wq1zeDMHIZhHMf2ODOfPn06n89LKT3PO336dJIk1krCMLSK++QnP2kvZGat9Z49e6wVrlu3Lk3ToaEhq0GllIVHKbVq1SqrZaXU5OTkokWLAFx44YXM/NhjjxGREOLzn/+8bTMMQ611mqZjY2PGmKGhITuASqWSteO24TKzNakZ85BKEifwhOeBcODAgTRVAKD4Y6tWP/rb3xCIwC8fObTlp/8LHv54zWd++Yu//dufP3jr+vX3/uAHv3/mH/bs3ZfBkJC3rrs1NcxK/fCHP9y+47lqtUokc34gGTpTURT9szWfzZUKOs5cP4A2zCbI5cCcpimArVu3ur4XhxGM6S53jY6OdnV1rV27Vmvted7DDz/cHndEdP311zuOMzAwsGHDBvuoANI03bZtm0XOcZxGo+H7vuu6GzdutKp/8MEH+/r67FMLIVatWiWlNMbce++9Uko7XSmlVqxYoZQaHBzcsGHDE088US6XkySpVque5+Xz+TiOT5069eyzzwKwF952223Hjh0755xz9u3bl2XZ+vXr7eL3xz/+8UMPPdTZ2en7fpIk+Xw+yzIi2rhxYxAE9Xp9y5YttvNRFAVBYGFzXTcMwykbMqwNZxkntUaFWc+bN48gyoXOv/npA2w4y7TSfGJ4SPgSEguXnFuJKmFYZ8O7nn8hn8+7vrdo8cXbtj8bpsl/+/69EAIkcp2dEAJS9sxfAOGAnEJn96N//4TKmA2bRLO2k59hw3EY7d+/v6unu7kR7gDUZAMrS5Ysefrpp9uDK01TS0GLFy8Ow9CqnpnHx8cvuugiIsrn8+1rLTV1dnbOmzfve9/7njHGckiSJJs3b7bn7N69u+0QWp5ZvXp1uwNnucLXXXfdr3/9a3twzZo1Wuuf/exndnw88MADaZreeOONUkoievTRR6+++mrbjuXJtjiO09HRce+999o7WpuO47jNdVrrGTt4GsbASAgBUauGAuQK1897zSWnQJpmSsdxGpXLZUEC7ADIUsVkGmHs+369VpszpxcGWaa05jCKcoX8RK0qPVe6juu6aZx0lQrUikOE9Sifz7FW5DgAwkYjVZnjualOhRASMqw3enp6arWa7/v5fL7p3gAA7NRqjMnlcp7nMbOlGgCVSiWfz4dhWCqVlFJRFJXL5Vqt5nmetSoAlkk8z6vX63ak53I5KaWF2Z4D4MyZM8VisdFouK4rpUySpFAohGFYLBYtXwkhXNd1XdcSb7lctrOLpSzP84wxYRh6nkdEjuMkSeK6rud5SZJIKX3fl1IyszHGmq/Fsv2kZ+X6GACatSRXAKxb2VDtcAO3oKRmsNQQhKDmrN7eNkhb8VcCCOxAA5E2EOQSZVr50iEAyriOwNvX6a3cuQ9Q7OX9k5kxBW3YGHKcNEsdxyMBu4ieCjHztE/bEKxCCcwQtjEbB40y5F0ohkcQ0GRj59qBzLIkcH200xDeMZgyiw+As+NyKYMIKoPvQkDDaBIJZ5JctOOj7cCzsnZnMhjtCiWEAQOQMB6kC0BzEzciAHFYDzrymo0ga5nCGMXMUkrwu4R2ZkE6Oys4A5IMnou0kRrldRbiNHL9QIE1GCBqbncLAhwDaZopOYqQABoGAAEe2IOh1IABpZEp5HIw2iSRKBUBglJwHUCA0GjUC4WOd+/gH0QNH2CZiVCsEKUnjrz6kYULIBi+i8AFNKSAFCDBEBmEARk4HuBkBmwgYYRJyMZLyYFxDUMbGIFaDV6AiQkYdfTI0QuWrwAIXgCjYRQ8F4LgNaFqBknbE14zfvd+aOWDJNPWQwR4DhzR3dv93O+fqg4Pf3zlysCTyAXIF+A5cAPyHE8ICKmkliAYgA2YhdE5wZAEJiiDlHH6NFggalRHhvce3Hf+4osuuPBiaM5ef9NdfPHRZ569YOUKQEAIDmOa5hY3k+5n4WnJDF8uVrHL7CQp4mT8+d17f/dUh+Fze+f0LVqMwEdHJ7o6USoiyMFxIBlCARqaoRkGiDNUGpiootZArX785ZfeGDrmz+m6/PprvEsXo9aACl7fuWeiUbvys2sQuCB+69TJhR9dBkEggZafMYvLdJmRt61gJIxjNIZG4BXwxrHGrr3PP/7k5NBwKV/omdPXN39+eWB+UO5E4KcSqcOGDJRxFYs0TccrY2+cGD9xsjIy4jtuZ3f5slv+BPN6UPDS0RMTjejJR57+xMdvGFixHI4A8e+2bb3hX3wenUUUfAihIdrGM5tq2pazM0kIRhpGmkFpxBlGxzByGmMTR57d/tru3aZeLwpCllCmfccl6aWpgmAn8BWZWtJQEm4uuP76T3iLFsEQSiUYc+rpp/Ye2K9d90+++FUs/ShOnoorE797dvtn/+VXcc4CcIZCoKXIANPyFR3MLoiaclY2liYihwQxoA3iuHr4yOjhI72gziBAFOLYcQwNI2ygHqJaU2HquC58F76LchF93ejqgCcR+BgfH3n9zePHj4+PVXp6eq5ceS0GBxEUUQu3PfWkzgXXfe4WLLlYN+pywXw4wq6WeMqhb1UQfejlbBuCXYMaIwzDMBoxapMnfv/M+OHX1KmhuZ43EOShNVQG6UAyAgfECEMkCmlmJmuTk7XRiYlKmoS+zPX1LFq6tOeSJZAeIvXWwUM7Dhy8cNVVV9xyM86bH8MEPT0KoplrN61+iMmY2QovAG9DyC56QGDOtGynKtRDVCbx8qtv7Hhu5OVDulJxswwqka4IkyhOEwEKSAaQgXA84RTLXex5A59YjQXzMTmBLHnz1de279pTnr/wj264sW/FZRjoxZwu7QcZSMHk4EnGdCPSZHi2ShLAWVEfBpih0UyxIRhkKYcxCUKSol5DZRKjZzA2jloNcXL6+DEdxpykeccp5PNuLo9iDrkcMoViCZXq2J69Q0Mj1bABR3xk+fJzPncLBuaiI485PXAcTVRL4qJfdICpGjwBG86YRcjKzLhcM44DQyAbPIAhNjBaj54ZfuWVsWNv9XuF/vkDADA0As0AIVWIEzRC1OtxZWy8OjkxMVGbnGxM1uM06Sx3nz94ycDll+GKS9HdiYF+OC4YzIY8HxDMTNNjpTQVw51lOZyFUJoq15sa0FmaCMCTQjAhbKAaYmzs+N4DB3Y+Xxs5PccRpUrFjSMkmc4MMmbNTEJLWdOq/8JF6Cv3XHzhwFXL0deNnI/+bgRuVaUBHI8kjIQGHGnjRtMT6gmm5W3Pegpvy5eDzXYTU2+8kABpZV091OoIY4QxJqs4M6qOHK6eOF6pVCQ5ApIM93b3BvM/grnz0N+NvIe+bnQE8H0UCgo6lhDwvGZmtgADysATEM2KFAACRraKXFrRoA+1vK06Bc1tBd0KXqM5eRvHvuvARkKVhtKo1qENoMHN0hZbxYBCHkLCl3AEHKfpfEBAuCCnxWPNe2LqnvaX6VmDszZ0FkJtd1tMFZPaWUGAHHBrdBsoAwakALhZ1kAGZGOn1NpWEmCA7StOGIYgXFsqxIQU0K0djWa9arMjxkIIzNaCA2e/w0VMreQJ8Fp/sQZRW9do6l0YkAbp5hECBGUQGhKiWZdKrc1ZI0EEmr771xIJyHazAKRgIIXBbKUxgLMRml5Rxc0DAMgWaE/FNcWU4wWnfRIDBsQQBkKANEACgmEIGiCCa6Z4zZqOTRjBtOPA1Jz0tlcAfRjlHTyF1n/OziJnCNg5h5kJMOTZPHGaPl3ZPAbNkjMSLdabqnecUUjcNCnTuq+AAAtkgAJE8w02H3aZMUy5xW9nCTODbFkdDMgQGUAIZAaw452aJV5SA2yEoNZGuW6DwmCCfFu4zTRvOW1DqI3K7CwE4P8CjprIv+uh/gkAAAAASUVORK5CYII=";
const PHONE_B64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQzAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjIgMTYuOTJ2M2EyIDIgMCAwMS0yLjE4IDIgMTkuNzkgMTkuNzkgMCAwMS04LjYzLTMuMDdBMTkuNSAxOS41IDAgMDEzLjA3IDkuODFhMTkuNzkgMTkuNzkgMCAwMS0zLjA3LTguNjhBMiAyIDAgMDEyIDFoM2EyIDIgMCAwMTIgMS43MmMuMTI3Ljk2LjM2MSAxLjkwMy43IDIuODFhMiAyIDAgMDEtLjQ1IDIuMTFMNi45MSA4LjkyYTE2IDE2IDAgMDA2LjE3IDYuMTdsMS4yOC0xLjI4YTIgMiAwIDAxMi4xMS0uNDVjLjkwNy4zMzkgMS44NS41NzMgMi44MS43QTIgMiAwIDAxMjIgMTYuOTJ6Ii8+PC9zdmc+";
const MOBILE_B64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQzAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSI1IiB5PSIyIiB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSIxMiIgeTE9IjE4IiB4Mj0iMTIuMDEiIHkyPSIxOCIvPjwvc3ZnPg==";
const EMAIL_B64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQzAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNCA0aDE2YzEuMSAwIDIgLjkgMiAydjEyYzAgMS4xLS45IDItMiAySDRjLTEuMSAwLTItLjktMi0yVjZjMC0xLjEuOS0yIDItMnoiLz48cG9seWxpbmUgcG9pbnRzPSIyMiw2IDEyLDEzIDIsNiIvPjwvc3ZnPg==";
const GLOBE_B64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQzAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxsaW5lIHgxPSIyIiB5MT0iMTIiIHgyPSIyMiIgeTI9IjEyIi8+PHBhdGggZD0iTTEyIDJhMTUuMyAxNS4zIDAgMDE0IDEwIDE1LjMgMTUuMyAwIDAxLTQgMTAgMTUuMyAxNS4zIDAgMDEtNC0xMCAxNS4zIDE1LjMgMCAwMTQtMTB6Ii8+PC9zdmc+";
const PIN_B64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQzAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTBjMCA3LTkgMTMtOSAxM3MtOS02LTktMTNhOSA5IDAgMDExOCAweiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48L3N2Zz4=";
const LOGO_FILE_SRC = "./Office365Logo.png";
const LOGO_SRC = "data:image/png;base64,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";

const ADDR = "89 Leuning Street, Suite E &nbsp;&middot;&nbsp; South Hackensack, NJ 07606";
const WEB = "vkcsystems.com";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

let emailTouched = false;

function buildEmailFromName(fullName) {
  const parts = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s-]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length < 2) {
    return "";
  }

  const firstInitial = parts[0][0] || "";
  const lastName = parts[parts.length - 1].replace(/-/g, "");

  if (!firstInitial || !lastName) {
    return "";
  }

  return `${firstInitial}${lastName}@vkcsystems.com`;
}

function syncEmailFromName() {
  if (emailTouched) {
    return;
  }

  const generatedEmail = buildEmailFromName(document.getElementById("inp-name").value);
  if (generatedEmail) {
    document.getElementById("inp-email").value = generatedEmail;
  }
}

function formatPhoneInput(value) {
  const digits = digitsOnly(value).slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function handlePhoneInput(event) {
  event.target.value = formatPhoneInput(event.target.value);
  updatePreview();
}

function buildSignature(name, creds, title, title2, phone, ext, cell, email, logoSrc = LOGO_SRC) {
  const safeName = escapeHtml(name);
  const safeCreds = escapeHtml(creds);
  const safeTitle = escapeHtml(title);
  const safeTitle2 = escapeHtml(title2);
  const safePhone = escapeHtml(phone);
  const safeExt = escapeHtml(ext);
  const safeCell = escapeHtml(cell);
  const safeEmail = escapeHtml(email);

  const displayName = safeName + (safeCreds ? ", " + safeCreds : "");
  const titleLine = safeTitle + (safeTitle2 ? " &nbsp;&middot;&nbsp; " + safeTitle2 : "");
  const extSpan = safeExt ? `<span style="color:#aaaaaa;font-size:10px;">&nbsp;ext. ${safeExt}</span>` : "";
  const cellRow = safeCell ? `
        <tr>
          <td style="padding:3px 8px 3px 0;vertical-align:middle;width:18px;" width="18">
            <img src="data:image/svg+xml;base64,${MOBILE_B64}" width="14" height="14" alt="Cell" style="display:block;border:0;">
          </td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#444444;padding:3px 0;vertical-align:middle;">
            <a href="tel:${digitsOnly(cell)}" style="color:#444444;text-decoration:none;">${safeCell}</a>
          </td>
        </tr>` : "";

  return `<table cellpadding="0" cellspacing="0" border="0"
  style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;
         mso-table-lspace:0pt;mso-table-rspace:0pt;max-width:560px;">
  <tr>
    <td style="vertical-align:top;padding:8px 0;">
      <p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#111111;letter-spacing:0.4px;line-height:1.2;">${displayName}</p>
      <p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;color:#CC0000;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">${titleLine}</p>
      <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#777777;letter-spacing:1px;">VKC Systems Inc.</p>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;margin-bottom:8px;">
        <tr><td style="height:1px;background-color:#dddddd;font-size:0;line-height:0;"></td></tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:3px 8px 3px 0;vertical-align:middle;width:18px;" width="18">
            <img src="data:image/svg+xml;base64,${PHONE_B64}" width="14" height="14" alt="Phone" style="display:block;border:0;">
          </td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#444444;padding:3px 0;vertical-align:middle;">
            <a href="tel:${digitsOnly(phone)}" style="color:#444444;text-decoration:none;">${safePhone}</a>${extSpan}
          </td>
        </tr>
        ${cellRow}
        <tr>
          <td style="padding:3px 8px 3px 0;vertical-align:middle;width:18px;" width="18">
            <img src="data:image/svg+xml;base64,${EMAIL_B64}" width="14" height="14" alt="Email" style="display:block;border:0;">
          </td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;padding:3px 0;vertical-align:middle;">
            <a href="mailto:${safeEmail}" style="color:#CC0000;text-decoration:none;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:3px 8px 3px 0;vertical-align:middle;width:18px;" width="18">
            <img src="data:image/svg+xml;base64,${GLOBE_B64}" width="14" height="14" alt="Website" style="display:block;border:0;">
          </td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;padding:3px 0;vertical-align:middle;">
            <a href="https://vkcsystems.com" style="color:#CC0000;text-decoration:none;">${WEB}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:3px 8px 3px 0;vertical-align:middle;width:18px;" width="18">
            <img src="data:image/svg+xml;base64,${PIN_B64}" width="14" height="14" alt="Address" style="display:block;border:0;">
          </td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#444444;padding:3px 0;vertical-align:middle;">${ADDR}</td>
        </tr>
      </table>
    </td>
    <td style="width:28px;" width="28">&nbsp;</td>
    <td style="vertical-align:middle;text-align:center;width:140px;" width="140">
      <img src="${logoSrc}" width="130" height="46" alt="VKC Systems"
           style="display:block;border:0;outline:none;text-decoration:none;max-width:130px;height:46px;object-fit:contain;">
    </td>
  </tr>
</table>`;
}

function updatePreview() {
  const name = document.getElementById("inp-name").value.trim() || "Your Name";
  const creds = document.getElementById("inp-creds").value.trim();
  const title = document.getElementById("inp-title").value.trim() || "Your Title";
  const title2 = document.getElementById("inp-title2").value.trim();
  const phone = document.getElementById("inp-phone").value.trim() || "000-000-0000";
  const ext = document.getElementById("inp-ext").value.trim();
  const cell = document.getElementById("inp-cell").value.trim();
  const email = document.getElementById("inp-email").value.trim() || "yourname@vkcsystems.com";

  document.getElementById("sig-preview").innerHTML = buildSignature(name, creds, title, title2, phone, ext, cell, email, LOGO_FILE_SRC);
}

function copySignature() {
  const name = document.getElementById("inp-name").value.trim();
  const creds = document.getElementById("inp-creds").value.trim();
  const title = document.getElementById("inp-title").value.trim();
  const title2 = document.getElementById("inp-title2").value.trim();
  const phone = document.getElementById("inp-phone").value.trim();
  const ext = document.getElementById("inp-ext").value.trim();
  const cell = document.getElementById("inp-cell").value.trim();
  const email = document.getElementById("inp-email").value.trim();

  if (!name || !title || !phone || !email) {
    alert("Please fill in Name, Title, Phone, and Email before copying.");
    return;
  }

  const renderedHtml = buildSignature(name, creds, title, title2, phone, ext, cell, email, LOGO_FILE_SRC);
  fallback(renderedHtml);
}

function fallback(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  tmp.style.position = "fixed";
  tmp.style.left = "-9999px";
  tmp.style.top = "0";
  tmp.style.background = "#ffffff";
  document.body.appendChild(tmp);
  const range = document.createRange();
  range.selectNode(tmp);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.body.removeChild(tmp);
  showToast();
}

function showToast() {
  const t = document.getElementById("toast");
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 4000);
}

updatePreview();

document.getElementById("inp-phone").addEventListener("input", handlePhoneInput);
document.getElementById("inp-cell").addEventListener("input", handlePhoneInput);
document.getElementById("inp-name").addEventListener("input", () => {
  syncEmailFromName();
  updatePreview();
});
document.getElementById("inp-email").addEventListener("input", () => {
  emailTouched = document.getElementById("inp-email").value.trim() !== "";
});
syncEmailFromName();

document.getElementById("inp-creds").addEventListener("input", updatePreview);
document.getElementById("inp-title").addEventListener("input", updatePreview);
document.getElementById("inp-title2").addEventListener("input", updatePreview);
document.getElementById("inp-ext").addEventListener("input", updatePreview);
document.querySelector(".copy-btn").addEventListener("click", copySignature);
