from random import choice, sample, seed
import string
def generate_text(key, text=''):
    if not text:
        seed(1961)
        symbols = string.ascii_letters + string.digits + '.#@$%,:*' + ' '
        n_symbols = 1000
        text = ''.join([choice(symbols) for _ in range(n_symbols)])
    positions = sorted(sample(range(len(text)), k=len(key)))
    new_text = ''
    for i in range(len(text)):
        if i in positions:
            new_text+= key[positions.index(i)]
        else:
            new_text+= text[i]
    
    print(positions)
    print(new_text)

generate_text('opendays')