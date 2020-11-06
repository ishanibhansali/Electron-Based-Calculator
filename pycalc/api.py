from add import add as addTwoNums
import sys
import zerorpc

class api(object):
    def add(self, num1, num2):
        try:
            return addTwoNums(num1, num2)
        except Exception as e:
            return 0.0    
    def echo(self, text):
        return text

def parse_port():
    port = 4242
    try:
        port = int(sys.argv[1])
    except Exception as e:
        pass
    return '{}'.format(port)

def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    s = zerorpc.Server(api())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()