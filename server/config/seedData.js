const seedProducts = [
  {
    name: 'Halfmoon Red Dragon',
    category: 'Halfmoon',
    price: 780000,
    unit: 'con',
    rating: 4.9,
    description: 'Rồng Đỏ 180° đẹp mắt, vây rộng và màu sắc nổi bật.',
    image: '/images/fish-1.svg'
  },
  {
    name: 'Halfmoon Super Yellow',
    category: 'Halfmoon',
    price: 760000,
    unit: 'con',
    rating: 4.8,
    description: 'Vàng tuyền rực rỡ, thân mập khỏe và vây kéo dài.',
    image: '/images/fish-2.svg'
  },
  {
    name: 'Halfmoon Blue Rim',
    category: 'Halfmoon',
    price: 820000,
    unit: 'con',
    rating: 4.8,
    description: 'Thân trắng viền xanh, vây nở tròn 180° rất đẹp.',
    image: '/images/fish-3.svg'
  },
  {
    name: 'Halfmoon Black Orchid',
    category: 'Halfmoon',
    price: 840000,
    unit: 'con',
    rating: 4.9,
    description: 'Phong Lan Đen sang trọng, vây dày và bóng.',
    image: '/images/fish-4.svg'
  },
  {
    name: 'Halfmoon White Opaque',
    category: 'Halfmoon',
    price: 720000,
    unit: 'con',
    rating: 4.7,
    description: 'Trắng sữa mềm mại, rất phù hợp cho hồ trưng bày.',
    image: '/images/fish-5.svg'
  },
  {
    name: 'Halfmoon Mustard Gas',
    category: 'Halfmoon',
    price: 790000,
    unit: 'con',
    rating: 4.8,
    description: 'Thân mù tạt với viền vàng nổi bật, dáng vây uyển chuyển.',
    image: '/images/fish-6.svg'
  },
  {
    name: 'Halfmoon Copper',
    category: 'Halfmoon',
    price: 860000,
    unit: 'con',
    rating: 4.9,
    description: 'Màu đồng ánh kim, dải vây rộng và phản quang đẹp.',
    image: '/images/fish-1.svg'
  },
  {
    name: 'Halfmoon Super Red',
    category: 'Halfmoon',
    price: 810000,
    unit: 'con',
    rating: 4.9,
    description: 'Đỏ tuyền rực rỡ, vây nở đầy, cân đối và khỏe mạnh.',
    image: '/images/fish-2.svg'
  },
  {
    name: 'Halfmoon Marble',
    category: 'Halfmoon',
    price: 830000,
    unit: 'con',
    rating: 4.8,
    description: 'Đốm loang độc đáo, mỗi con có hoa văn riêng biệt.',
    image: '/images/fish-3.svg'
  },
  {
    name: 'Halfmoon Lavender',
    category: 'Halfmoon',
    price: 795000,
    unit: 'con',
    rating: 4.8,
    description: 'Thân xám vây tím hồng, phong cách nhẹ nhàng.',
    image: '/images/fish-4.svg'
  },
  {
    name: 'Nemo Galaxy Classic',
    category: 'Nemo Galaxy',
    price: 650000,
    unit: 'con',
    rating: 4.7,
    description: 'Cam - đỏ - đen với vảy ánh kim, kiểu dáng mạnh mẽ.',
    image: '/images/fish-5.svg'
  },
  {
    name: 'Nemo Galaxy Candy',
    category: 'Nemo Galaxy',
    price: 690000,
    unit: 'con',
    rating: 4.8,
    description: 'Màu ngọt ngào, đa sắc và bắt mắt cho hồ nhỏ.',
    image: '/images/fish-6.svg'
  },
  {
    name: 'Nemo Galaxy Copper',
    category: 'Nemo Galaxy',
    price: 720000,
    unit: 'con',
    rating: 4.8,
    description: 'Nemo ánh đồng sang trọng, vảy kim lấp lánh.',
    image: '/images/fish-1.svg'
  },
  {
    name: 'Nemo Galaxy Yellow Base',
    category: 'Nemo Galaxy',
    price: 700000,
    unit: 'con',
    rating: 4.7,
    description: 'Nền vàng với vảy kim, tươi sáng và rực rỡ.',
    image: '/images/fish-2.svg'
  },
  {
    name: 'Nemo Galaxy Tiger',
    category: 'Nemo Galaxy',
    price: 730000,
    unit: 'con',
    rating: 4.8,
    description: 'Sọc hổ rõ nét, màu sắc đối lập, rất cá tính.',
    image: '/images/fish-3.svg'
  },
  {
    name: 'Nemo Galaxy Multi-Color',
    category: 'Nemo Galaxy',
    price: 760000,
    unit: 'con',
    rating: 4.9,
    description: 'Phối phức hợp nhiều tông màu, độc đáo và lạ mắt.',
    image: '/images/fish-4.svg'
  },
  {
    name: 'Nemo Galaxy Red Base',
    category: 'Nemo Galaxy',
    price: 740000,
    unit: 'con',
    rating: 4.8,
    description: 'Nền đỏ rực, vảy kim nổi bật và sang trọng.',
    image: '/images/fish-5.svg'
  },
  {
    name: 'Nemo Galaxy Leopard',
    category: 'Nemo Galaxy',
    price: 770000,
    unit: 'con',
    rating: 4.8,
    description: 'Đốm báo hoang dại, kiểu dáng đậm chất thuỷ sinh.',
    image: '/images/fish-6.svg'
  },
  {
    name: 'Nemo Galaxy Koi Star',
    category: 'Nemo Galaxy',
    price: 780000,
    unit: 'con',
    rating: 4.9,
    description: 'Vảy ánh kim ngôi sao, lấp lánh dưới ánh đèn.',
    image: '/images/fish-1.svg'
  },
  {
    name: 'Nemo Galaxy Blue Star',
    category: 'Nemo Galaxy',
    price: 790000,
    unit: 'con',
    rating: 4.9,
    description: 'Mảng xanh dạ quang, rất đẹp trong hồ sáng nhẹ.',
    image: '/images/fish-2.svg'
  },
  {
    name: 'Dumbo Halfmoon Super Red',
    category: 'Dumbo',
    price: 850000,
    unit: 'con',
    rating: 4.9,
    description: 'Tai vơi đỏ tuyền, vây ngực lớn, dáng cá mạnh mẽ.',
    image: '/images/fish-3.svg'
  },
  {
    name: 'Dumbo Halfmoon Lavender',
    category: 'Dumbo',
    price: 830000,
    unit: 'con',
    rating: 4.8,
    description: 'Tai vơi tím hồng mềm mại, rất hợp hồ trang trí.',
    image: '/images/fish-4.svg'
  },
  {
    name: 'Dumbo Plakat Red Dragon',
    category: 'Dumbo',
    price: 860000,
    unit: 'con',
    rating: 4.9,
    description: 'Tai vơi đuôi ngắn Rồng Đỏ, khỏe mạnh và nổi bật.',
    image: '/images/fish-5.svg'
  },
  {
    name: 'Dumbo Halfmoon White',
    category: 'Dumbo',
    price: 820000,
    unit: 'con',
    rating: 4.7,
    description: 'Tai vơi trắng tinh khiết, hiền hậu và dễ nuôi.',
    image: '/images/fish-6.svg'
  },
  {
    name: 'Dumbo Plakat Mustard Gas',
    category: 'Dumbo',
    price: 840000,
    unit: 'con',
    rating: 4.8,
    description: 'Đuôi ngắn Mustard Gas, tai vơi lớn và cá tính.',
    image: '/images/fish-1.svg'
  },
  {
    name: 'Dumbo Plakat Blue Rim',
    category: 'Dumbo',
    price: 810000,
    unit: 'con',
    rating: 4.8,
    description: 'Tai vơi Blue Rim, màu sắc tinh tế và vây gọn.',
    image: '/images/fish-2.svg'
  },
  {
    name: 'Dumbo Halfmoon Copper',
    category: 'Dumbo',
    price: 870000,
    unit: 'con',
    rating: 4.9,
    description: 'Tai vơi ánh đồng, lấp lánh và khỏe khoắn.',
    image: '/images/fish-3.svg'
  },
  {
    name: 'Dumbo Plakat Multi-Color',
    category: 'Dumbo',
    price: 830000,
    unit: 'con',
    rating: 4.8,
    description: 'Đa sắc rực rỡ, tai vơi lớn và thân ngắn gọn.',
    image: '/images/fish-4.svg'
  },
  {
    name: 'Dumbo Halfmoon Super Black',
    category: 'Dumbo',
    price: 860000,
    unit: 'con',
    rating: 4.9,
    description: 'Đen tuyền, tai vơi rộng, tạo dáng thanh lịch.',
    image: '/images/fish-5.svg'
  },
  {
    name: 'Dumbo Plakat Fancy',
    category: 'Dumbo',
    price: 880000,
    unit: 'con',
    rating: 4.9,
    description: 'Fancy đặc biệt, tai vơi lớn và màu sắc phong phú.',
    image: '/images/fish-6.svg'
  }
];

module.exports = seedProducts;
