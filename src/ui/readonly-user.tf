resource "aws_iam_user" "readonly_user" {
  name = "eks-readonly-user"
  tags = {
    Purpose = "EKS ReadOnly Access"
  }
}

resource "aws_iam_policy" "eks_readonly_policy" {
  name        = "EKSReadOnlyPolicy"
  description = "Read-only access to EKS resources"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "eks:DescribeCluster",
          "eks:ListClusters",
          "eks:AccessKubernetesApi"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "readonly_attach" {
  user       = aws_iam_user.readonly_user.name
  policy_arn = aws_iam_policy.eks_readonly_policy.arn
}
