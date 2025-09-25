resource "aws_eks_cluster" "innovatemart" {
  name     = "innovatemart-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn
  version  = "1.32"

  vpc_config {
    subnet_ids = [
      aws_subnet.public_a.id,
      aws_subnet.public_b.id,
      aws_subnet.private_a.id,
      aws_subnet.private_b.id
    ]
    endpoint_private_access = false
    endpoint_public_access  = true
  }

  tags = {
    Name = "innovatemart-cluster"
  }
}

resource "aws_eks_node_group" "default" {
  cluster_name    = aws_eks_cluster.innovatemart.name
  node_group_name = "innovatemart-nodes"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = [
    aws_subnet.private_a.id,
    aws_subnet.private_b.id
  ]

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["t3.medium"]

  tags = {
    Name = "innovatemart-node-group"
  }
}
