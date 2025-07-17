"""Set paid column NOT NULL

Revision ID: 763ed295c1cf
Revises: 4f8ab601633c
Create Date: 2025-07-16 13:32:22.236487

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '763ed295c1cf'
down_revision: Union[str, Sequence[str], None] = '4f8ab601633c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
