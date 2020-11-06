def add(s,t):
    if s == '∞':
        s = 'inf'
    elif s == '-∞':
        s = '-inf'
    if t == '∞':
        t = 'inf'
    elif t == '-∞':
        t = '-inf'
    try:
        result = str(float(s)+float(t))
        if result == 'nan':
            return 'Undefined Expression!'
        else:
            return result
    except ValueError as e:
        return 'Please enter a valid input!'
    

if __name__ == '__main__':
    ss = [
        ['1', '2'],
        ['4', '5'],
        ['-', '2'],
        ['-3', '4'],
        ['a', 'b'],
        ['123456789009876543211234567890', '123456789009876543211234567890'],
        ['0.3', '0.9'],
        ['1.2e+2', '1.2e-3'],
        ['inf','0'],
        ['inf','-inf'],
        ['∞','0']
    ]
    for s in ss:
        res = add(s[0],s[1])
        print('{} = {}'.format(s, res))