type Vec3 = {
  x: number;
  y: number;
  z: number;
};

class BinaryReader {
  private bytes: Uint8Array;
  private head: number = 0;
  // private littleEndian: boolean = false;

  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
  }

  public length(): number {
    return this.bytes.length;
  }

  public readByte() {
    let byte = this.bytes[this.head];
    this.head += 1;
    return byte;
  }

  public readBytes(length: number) {
    let until = this.head + length;
    let bytes = this.bytes.slice(this.head, until);
    this.head = until;
    return bytes;
  }

  public readUInt16() {
    let bytes = this.readBytes(2);
    let res = (bytes[0] << 8) | bytes[1];
    if (res < 0) return 0x10000 + res;
    return res;
  }

  public readUInt32() {
    let bytes = this.readBytes(4);
    let res = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
    if (res < 0) return 0x100000000 + res;
    return res;
  }

  public readInt16() {
    let x = this.readUInt16();
    if ((x & 0x8000) == 0) return x;
    return -(~x + 1);
  }

  public readInt32() {
    let x = this.readUInt32();
    if ((x & 0x80000000) == 0) return x;
    return -(~x + 1);
  }

  public readFloat32() {
    let bytes = this.readBytes(4);
    let v = new DataView(new ArrayBuffer(4));
    bytes.forEach((b, i) => v.setUint8(i, b));
    return v.getFloat32(0);
  }

  public readVec3(): Vec3 {
    let x = this.readFloat32();
    let y = -this.readFloat32();
    let z = -this.readFloat32();
    return { x, y, z };
  }

  public readAscii(length: number) {
    let bytes = this.readBytes(length);
    let bytesWoNull = bytes.filter((v) => v !== 0x00);
    let text = new TextDecoder().decode(bytesWoNull);
    return text;
  }
}

class BinaryWriter {}

export { BinaryReader, BinaryWriter };
